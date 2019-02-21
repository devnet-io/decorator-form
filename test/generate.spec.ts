import Form from "../src/decorators/form/Form";
import Input from "../src/decorators/input/Input";
import FieldWrapper, { registerExternal } from "../src/fields/FieldWrapper";
import { InputType } from '../src/fields/InputType';
import { generateSchema } from "../src/generate";

@Form({ title: "Test Form", description: "Really!" })
class TestClass {

	@Input({ type: InputType.TEXT, title: "First Name", required: true })
	public firstName: string;

	@Input({ type: InputType.PASSWORD, title: "Last Name" })
	public lastName: string;

	@Input({ type: InputType.NUMBER, title: "ID" })
	public id: number;

}

describe("Schema Generator", () => {

	it("Generates schema", () => {
		const schema = generateSchema(TestClass);
		expect(JSON.stringify(schema)).toEqual(JSON.stringify(schema));
	});

	it("exclude test", () => {
		const schema = generateSchema(TestClass, null, ["lastName"]);
		expect(JSON.stringify(schema)).toEqual(JSON.stringify(schema));
	});
});
