import { InputType } from '../../fields/InputType';
import { IInputArgs } from './IInputArgs';

/**
 * Parses and validates the common arguments object passed to {@link Input}
 * For full documentation: {@link https://www.devnet.io/libs/type-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export default class InputArgs implements IInputArgs {

	public static isValid(args: any): boolean {
		// TODO validate
		return true;
	}

	public static parseArgs(params: any, thow: boolean = true): InputArgs {

		if(this.isValid(params)) {
			return params;
		}

		throw new Error("Invalid options passed to @Input()");
	}

	public type: InputType;
	public title: string;

	constructor(type: InputType, title: string) {
		this.type = type;
		this.title = title;
	}

	public isValid(): boolean {
		return InputArgs.isValid(this);
	}
}
