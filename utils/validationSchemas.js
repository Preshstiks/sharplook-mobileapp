import * as Yup from "yup";

// Login validation schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const clientRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: Yup.string().oneOf(["CLIENT"]).required(),
  acceptedPersonalData: Yup.boolean().oneOf(
    [true],
    "You must accept personal data processing"
  ),
});
// Register validation schema
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  serviceType: Yup.string().required("Service type is required"),
  identityImage: Yup.mixed().nullable(),
  role: Yup.string().oneOf(["VENDOR"]).required(),
  acceptedPersonalData: Yup.boolean().oneOf(
    [true],
    "You must accept personal data processing"
  ),
});

// Forgot password validation schema
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// Reset password validation schema
export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

// Email verification schema
export const emailVerificationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(4, "Verification code must be 4 digits")
    .matches(/^\d{4}$/, "Verification code must contain only numbers")
    .required("Verification code is required"),
});

// Vendor business info validation schema
export const vendorBusinessInfoSchema = Yup.object().shape({
  businessName: Yup.string().required("Business name is required"),
  bio: Yup.string().required("Business description is required"),
  location: Yup.string().required("Location is required"),
  registerationNumber: Yup.string().required(
    "Business registration number is required"
  ),
  // portfolioLink: Yup.string()
  //   .url("Portfolio link must be a valid URL")
  //   .notRequired(),
});

export const addProductSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  price: Yup.string().required("Price is required"),
  qtyAvailable: Yup.string().required("Quantity is required"),
  picture: Yup.mixed().nullable(),
});
export const addServiceSchema = Yup.object().shape({
  serviceName: Yup.string().required("Service is required"),
  servicePrice: Yup.string().required("Price is required"),
  serviceImage: Yup.mixed().nullable(),
});
