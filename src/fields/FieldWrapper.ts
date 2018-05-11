import { Registry } from "react-registry";
import { InputType } from "./InputType";
import { providerConditions } from "../generate";

/**
 * Associates an input with a data type, an existing ui:widget, or allows a custom widget to be defined
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export type WidgetOverride = (props: IWidgetProps) => any;

export interface IWidgetProps {
	value: any;
	onChange: (newValue: any) => any;
	required: boolean;
	disabled: boolean;
	label: string;
}

export interface IFieldWrapperArgs {
	dataType: string;
	uiWidget?: string | WidgetOverride; // optional
	label?: boolean; // optional
}

export default class FieldWrapper {
	private dataType: string;
	private uiWidget: string | WidgetOverride;
	private label: boolean;

	constructor({dataType, uiWidget, label = true}: IFieldWrapperArgs) {
		this.dataType = dataType;
		this.uiWidget = uiWidget;
		this.label = label;
	}

	public getDataType(): string {
		return this.dataType;
	}

	public getUiWidget(): string | WidgetOverride {
		return this.uiWidget;
	}

	public isLabel(): boolean {
		return this.label;
	}
}

export function registerExternal(type: InputType | string, wrapper: FieldWrapper) {
	register(type, wrapper, providerConditions);
}

export function register(type: InputType | string, wrapper: FieldWrapper, conditions?: object) {
	Registry.register(wrapper, {id: type, registry: "type-form", conditions});
}
