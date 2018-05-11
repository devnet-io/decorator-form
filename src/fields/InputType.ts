import FieldWrapper, { register } from "./FieldWrapper";

/**
 * Common input types. See FieldWrapper for how to register your own.
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	PASSWORD = "password",
	CHECKBOX = "checkbox",
	TEXTAREA = "textarea",
	COLOR = "colorpicker"
}

register(InputType.TEXT, new FieldWrapper({dataType: "string"}));
register(InputType.NUMBER, new FieldWrapper({dataType: "number"}));
register(InputType.PASSWORD, new FieldWrapper({dataType: "string", uiWidget: "password"}));
register(InputType.CHECKBOX, new FieldWrapper({dataType: "boolean"}));
register(InputType.TEXTAREA, new FieldWrapper({dataType: "string", uiWidget: "textarea"}));
register(InputType.COLOR, new FieldWrapper({dataType: "string", uiWidget: "color"}));
