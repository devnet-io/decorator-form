import { InputType } from "../../fields/InputType";

/**
 * Common arguments object passed to {@link Input}
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export interface IInputArgs {
	type: InputType | string;
	title: string;
	required?: boolean;
}
