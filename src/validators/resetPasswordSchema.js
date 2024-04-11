import * as yup from "yup";

const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")

      .required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

export default resetPasswordSchema;
