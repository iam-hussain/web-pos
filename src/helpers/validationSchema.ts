import * as yup from "yup";
import { getMessage } from "./message";

const email = yup
  .string()
  .email("Not a valid email")
  .required("Email is required");

const password = yup
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters")
  .required("New password is required");

export const loginValidation = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: yup.object({
    email,
    password,
  }),
};

export const registerValidation = {
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  },
  validationSchema: yup.object({
    firstName: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "First Name must be at least 2 characters")
      .required("First Name is required"),
    lastName: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(2, "Last Name must be at least 2 characters")
      .required("Last Name is required"),
    email,
    mobileNumber: yup
      .string()
      .required("This field is Required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
    password,
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "Confirm passwords is not matching with new password."
      ),
  }),
};

export const categoryValidation = {
  initialValues: {
    title: "",
  },
  validationSchema: yup.object({
    title: yup
      .string()
      .required("This field is Required")
      .min(2, "Title must be at least 2 characters"),
  }),
};

export const productValidation = {
  initialValues: {
    title: "",
    price: 0,
    categoryId: 0,
  },
  validationSchema: yup.object({
    title: yup
      .string()
      .required("This field is Required")
      .min(2, "Title must be at least 2 characters"),
    price: yup
      .number()
      .required("This field is Required")
      .min(0.1, "The price can't be zero"),
    categoryId: yup
      .number()
      .required("This field is Required")
      .min(1, "Should select a valid category"),
  }),
};
