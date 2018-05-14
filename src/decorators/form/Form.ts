import { getSchemaKey } from '../../generate';
import Class from '../../util/Class';
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

	return (clazz: Class) => {
		const key = getSchemaKey(clazz);
		clazz.prototype[key] = {...clazz.prototype[key], ...args};
		return clazz;
	};
};

export default Form;
