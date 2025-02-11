import * as Yup from "yup";


export const topicValidationSchema = Yup.object().shape({
  name: Yup.string().required("Topic name is required."),
  visibility: Yup.string().required("Visibility is required.")
});