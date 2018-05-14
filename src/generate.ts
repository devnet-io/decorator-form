import { Provider } from "react-registry";
import FieldWrapper from "./fields/FieldWrapper";
import { InputType } from "./fields/InputType";
import Class from "./util/Class";
import { iDef } from "./util/TypeUtils";

/**
 * Core functionality of the library.
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export const SCHEMA: string = "__schema__";
export const providerConditions = {override: true};

export const setupSchema = (clazz: any): string => {
	const key = getSchemaKey(clazz.constructor);

	if (typeof clazz[key] === "undefined") {
		clazz[key] = { properties: [] };
	}

	return key;
};

// get a key using the constructor name so its unique form super classes
export function getSchemaKey(clazz: Class) {
	return SCHEMA + (clazz as any).name;
}

export interface ISchema {
	schema: object;
	uiSchema: object;
}

export const generateSchema = (clazz: any): ISchema => {
	const key = getSchemaKey(clazz);
	const instance = new clazz();

	if (typeof instance === "object" && typeof instance[key] === "object") {
		const data: any = {properties: []};

		// look for data schemas and properties from super classes
		findInherited(instance, (s: any) => {
			// add them to current schema, with current schema's properties overriding
			data.properties = [...s.properties, ...data.properties];
		});

		const schema: any = { title: data.title, description: data.description };
		const uiSchema: any = {};

		// only supports object type atm
		schema.type = "object";
		schema.properties = {};

		// filter required field
		schema.required = data.properties.filter((p: any) => p.required).map((p: any) => p.id);

		const provider = new Provider({registry: "type-form", conditions: providerConditions});

		// get correct data type
		data.properties.forEach((p: any) => {
			const fieldWrapper = provider.get(p.type) as FieldWrapper;

			if(typeof fieldWrapper !== "undefined") {
				schema.properties[p.id] = {...p, id: undefined, required: undefined, type: fieldWrapper.getDataType()};

				const widget = fieldWrapper.getUiWidget();

				if(iDef(widget)) {
					uiSchema[p.id] = {["ui:widget"]: widget};
				}

				const label = fieldWrapper.isLabel();

				if(iDef(label)) {
					uiSchema[p.id] = {...uiSchema[p.id], ["ui:options"]: {label}};
				}
			}
		});

		return {schema, uiSchema};
	}

	throw Error("Invalid class supplied. Make sure you are not passing an object instead.");
};

// recuse though prototypes to find schemas generated for super classes
function findInherited(instance: any, callback: (schema: object) => void): any {

	Object.keys(instance.__proto__).filter((k) => k.startsWith(SCHEMA)).forEach((k) => {
		callback(instance[k]);
		return findInherited(instance.__proto__, callback);
	});
}
