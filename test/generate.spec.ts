import Form from "../src/decorators/form/Form";
import Input from "../src/decorators/input/Input";
import { InputType } from '../src/fields/InputType';
import { generateSchema } from "../src/generate";

@Form({ title: "Test Form", description: "Really!" })
class TestClass {

	@Input({ type: InputType.Text, title: "First Name", required: true })
	public firstName: string;

	@Input({ type: InputType.Password, title: "Last Name" })
	public lastName: string;

	@Input({ type: InputType.Number, title: "ID" })
	public id: number;

}

describe("Schema Generator", () => {
	it("preliminary test", () => {

		const schema = generateSchema(TestClass, true);
		expect(schema).toEqual("{\"schema\":{\"title\":\"Test Form\",\"description\":\"Really!\",\"type\":\"object\",\"properties\":{\"firstName\":{\"type\":\"string\",\"title\":\"First Name\"},\"lastName\":{\"type\":\"string\",\"title\":\"Last Name\"},\"id\":{\"type\":\"number\",\"title\":\"ID\"}},\"required\":[\"firstName\"]},\"uiSchema\":{\"firstName\":{\"ui:options\":{\"label\":true}},\"lastName\":{\"ui:widget\":\"password\",\"ui:options\":{\"label\":true}},\"id\":{\"ui:options\":{\"label\":true}}}}");

	});
});
