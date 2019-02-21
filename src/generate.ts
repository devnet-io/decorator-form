import { includes } from "lodash";
import { Provider } from "react-registry";
import FieldWrapper from "./fields/FieldWrapper";
import Class from "./util/Class";
import { iDef } from "./util/TypeUtils";

/**
 * Core functionality of the library.
 * For full documentation: {@link https://www.devnet.io/libs/decorator-form/}
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
	fields: { [name: string]: any };
}

export const generateSchema = (clazz: any, conditions?: { [key: string]: any}, excluded?: string[]): ISchema => {
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
		const fields: any = {};

		// only supports object type atm
		schema.type = "object";
		schema.properties = {};

		// filter required field
		schema.required = data.properties.filter((p: any) => p.required && (!excluded || !includes(excluded, p.id))).map((p: any) => p.id);

		const provider = new Provider({
			registry: "decorator-form",
			conditions: iDef(conditions) ? {...conditions, ...providerConditions} : providerConditions
		});

		// get correct data type
		data.properties.forEach((p: any) => {

			// ignore the field if its to be excluded
			if(excluded && includes(excluded, p.id)) {
				return;
			}

			const fieldWrapper = provider.get(p.type) as FieldWrapper;

			if(iDef(fieldWrapper)) {
				schema.properties[p.id] = {...p, id: undefined, required: undefined, type: fieldWrapper.getDataType()};

				const field = fieldWrapper.getUiField();

				// if an override for the entire field is defined, use that and dont check for new widgets
				if(iDef(field)) {

					uiSchema[p.id] = {["ui:field"]: p.id};
					fields[p.id] = field;

				} else {

					const widget = fieldWrapper.getUiWidget();

					if(iDef(widget)) {
						uiSchema[p.id] = {["ui:widget"]: widget};
					}

					const array = fieldWrapper.isArray();

					if(iDef(array)) {
						schema.properties[p.id] = {...schema.properties[p.id], items: {type: fieldWrapper.getArrayType()}};
					}

				}

				const label = fieldWrapper.isLabel();

				if(iDef(label)) {
					uiSchema[p.id] = {...uiSchema[p.id], ["ui:options"]: {label}};
				}
			}
		});

		return {schema, uiSchema, fields};
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
