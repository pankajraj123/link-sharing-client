import * as Yup from "yup";

export const validationResourceSchema = Yup.object({
  description: Yup.string().required("Description is required."),
  Url: Yup.string().url("Please enter a valid URL.").optional(),
});
