import * as yup from "yup";

const validations = yup.object().shape({
	title: yup
		.string()
		.required("Zorunlu alan."),
	content: yup
		.string()
		.required("Zorunlu alan."),
	category: yup
		.string()
		.required("Zorunlu alan."),
});

export default validations;