import { Registry } from "react-registry";

import { providerConditions } from "../generate";
import { iDef } from "../util/TypeUtils";
import { InputType } from "./InputType";

/**
 * Associates an input with a data type, an existing ui:widget, or allows a custom widget to be defined
 * For full documentation: {@link https://www.devnet.io/libs/decorator-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export type WidgetOverride<T> = React.StatelessComponent<IWidgetProps<any>> | React.ComponentClass<IWidgetProps<any>>;

export interface IWidgetProps<T> {
	value: T;
	onChange: (newValue: T) => void;
	required?: boolean;
	disabled?: boolean;
	readonly: boolean;
	autofocus: boolean;
	options: object;
	label?: string;
}

export type FieldOverride<T> = React.StatelessComponent<IFieldProps<any>> | React.ComponentClass<IFieldProps<any>>;

export interface IFieldProps<T> {
	value: T;
	onChange: (newValue: T) => void;
	formContext?: any;
	autofocus?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	name?: string;
	label?: string;
	uiSchema: any;
	idSchema: any;
	formData: any;
}

export interface IFieldWrapperArgs {
	dataType: string;
	uiWidget?: string | WidgetOverride<any>; // optional
	uiField?: FieldOverride<any>; // optional
	label?: boolean; // optional
	arrayType?: string;
}

export default class FieldWrapper {
	private dataType: string;
	private uiWidget: string | React.StatelessComponent<IWidgetProps<any>> | React.ComponentClass<IWidgetProps<any>>;
	private uiField: React.StatelessComponent<IFieldProps<any>> | React.ComponentClass<IFieldProps<any>>;
	private label: boolean;
	private arrayType: string;

	constructor({dataType, uiWidget, uiField, label = true, arrayType}: IFieldWrapperArgs) {
		this.dataType = dataType;
		this.uiWidget = uiWidget;
		this.uiField = uiField;
		this.label = label;
		this.arrayType = arrayType;
	}

	public getDataType(): string {
		return this.dataType;
	}

	public getUiWidget(): string | WidgetOverride<any> {
		return this.uiWidget;
	}

	public getUiField(): FieldOverride<any> {
		return this.uiField;
	}

	public isLabel(): boolean {
		return this.label;
	}

	public isArray(): boolean {
		return iDef(this.arrayType);
	}

	public getArrayType(): string {
		return this.arrayType;
	}
}

export function registerExternal(type: InputType | string, wrapper: FieldWrapper) {
	register(type, wrapper, providerConditions);
}

export function register(type: InputType | string, wrapper: FieldWrapper, conditions?: object) {
	Registry.register(wrapper, {id: type, registry: "decorator-form", conditions});
}
