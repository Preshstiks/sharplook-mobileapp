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
  phone: Yup.string().required("Phone Number is required"),
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
  referredByCode: Yup.string().optional(),
});
// Register validation schema
export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone Number is required"),
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
  token: Yup.string().required("OTP is required"),
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
  portfolioImages: Yup.array().of(Yup.mixed()).nullable(),
  availability: Yup.object().shape({
    days: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one day")
      .required("Days are required"),
    fromTime: Yup.string().required("Start time is required"),
    toTime: Yup.string().required("End time is required"),
  }),
});

export const addProductSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
  qtyAvailable: Yup.string().required("Quantity is required"),
  picture: Yup.mixed().nullable(),
});
export const addServiceSchema = Yup.object().shape({
  serviceName: Yup.string().required("Service is required"),
  description: Yup.string().required("Description is required"),
  servicePrice: Yup.string().required("Price is required"),
  serviceImage: Yup.mixed().nullable(),
});

export const fundWalletSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
});

export const reviewValidationSchema = Yup.object().shape({
  comment: Yup.string()
    .trim()
    .required("Experience description is required")
    .min(10, "Please provide a more detailed experience")
    .max(500, "Experience description is too long")
    .when("star", {
      is: (star) => star <= 2,
      then: (schema) =>
        schema.min(
          20,
          "For low ratings, please provide detailed feedback (at least 20 characters)"
        ),
      otherwise: (schema) => schema,
    }),

  rating: Yup.number()
    .required("Rating is required")
    .oneOf([1, 2, 3, 4, 5], "Rating must be between 1 and 5 stars"),
});
export const inshopvalidationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  paymentMethod: Yup.string().required("Select a payment method"),
});
