import * as yup from "yup";

const signInSchema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default signInSchema;
