import { SCHEMA, setupSchema } from '../../generate';
import { IInputArgs } from './IInputArgs';
import InputArgs from './InputArgs';

/**
 * Decorator to indicate a form field / input. Placed on a field in a class.
 * For full documentation: {@link https://www.devnet.io/libs/type-graph/}
 *
 * @author Joe Esposito <joe@devnet.io>
 */

const Input = (params?: IInputArgs) => {
	const args = InputArgs.parseArgs(params);

	return (clazz: any, property: string) => {
		const key = setupSchema(clazz);
		clazz[key].properties.push({...args, id: property});
	};
};

export default Input;
