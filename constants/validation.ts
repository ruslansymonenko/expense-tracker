export const VALIDATION_RULES = {
  email: {
    required: "Email is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Email is invalid",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },
};

export const FORM_MESSAGES = {
  loginFailed: "Login Failed",
  registrationFailed: "Registration Failed",
  operationFailed: "Operation Failed",
};
