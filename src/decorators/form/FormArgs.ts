import IFormArgs from './IFormArgs';

/**
 * Parses and validates the common arguments object passed to {@link Form}
 * For full documentation: {@link https://www.devnet.io/libs/decorator-form/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

export default class FormArgs implements IFormArgs {

	public static isValid(args: any): boolean {
		// TODO validate args
		return true;
	}

	public static parseArgs(params: any, thow: boolean = true): FormArgs {

		if(this.isValid(params)) {
			return params;
		}

		throw new Error("Invalid options passed to @Input()");
	}

	public title?: string;
	public description?: string;

	constructor(title: string, desc: string) {
		this.title = title;
		this.description = desc;
	}

	public isValid(): boolean {
		return FormArgs.isValid(this);
	}
}
