import * as yup from "yup";

const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  })
  .required();

export default forgotPasswordSchema;
