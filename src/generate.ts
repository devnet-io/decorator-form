import { Provider } from "react-registry";
import FieldWrapper from "./fields/FieldWrapper";
import { InputType } from "./fields/InputType";
import { iDef } from "./util/TypeUtils";

/**
 * Core functionality of the library.
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export const SCHEMA: string = "__query__";
export const providerConditions = {override: true};

export const setupSchema = (cls: any) => {
	if (typeof cls[SCHEMA] === "undefined") {
		cls[SCHEMA] = { properties: [] };
		return true;
	}
	return false;
};

export const generateSchema = (cls: any, asJson: boolean = false): string | object => {
	const instance = new cls();

	if (typeof instance === "object" && typeof instance[SCHEMA] === "object") {
		const data = {...instance[SCHEMA]} as any;
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

		const out = {schema, uiSchema};

		return asJson ? JSON.stringify(out) : out;
	}

	throw Error("Invalid class supplied. Make sure you are not passing an object instead.");
};
