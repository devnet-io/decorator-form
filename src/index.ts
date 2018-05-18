/**
 * Index to expose modules
 * For full documentation: {@link https://www.devnet.io/libs/decorator-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export { generateSchema } from './generate';
export { InputType } from './fields/InputType';
export { default as Form } from './decorators/form/Form';
export { default as Input } from './decorators/input/Input';
export { registerExternal as register, default as FieldWrapper, IFieldProps, IWidgetProps } from './fields/FieldWrapper';
