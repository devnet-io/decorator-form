import { SCHEMA, setupSchema } from '../../generate';
import FormArgs from './FormArgs';
import IFormArgs from './IFormArgs';

/**
 * Decorator to indicate a form. Placed on a class
 * For full documentation: {@link https://www.devnet.io/libs/type-graph/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

const Form = (params?: IFormArgs) => {
	const args = FormArgs.parseArgs(params);

	return (cls: any) => {
		cls.prototype[SCHEMA] = {...cls.prototype[SCHEMA], ...args};
		return cls;
	};
};

export default Form;
