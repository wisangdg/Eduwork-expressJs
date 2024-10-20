export const createUserValidationSchema = {
  username: {
    in: ["body"],
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "username must be at least 5 characters with a maximal of 32 characters",
    },
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  displayName: {
    notEmpty: true,
  },
};

export const getUserValidationSchema = {
  filter: {
    in: ["query"],
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter must not be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Filter must be between 3 and 10 characters",
    },
  },
};
