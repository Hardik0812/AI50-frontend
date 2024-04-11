import * as yup from "yup";

const sendChatSchema = yup
  .object({
    type: yup.string().optional(),
    prompt: yup.string().required("Please add some message"),
  })
  .required();

export default sendChatSchema;
