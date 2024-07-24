import AppError from "../AppError";
import { apiConstants } from "../constants";

export const validateEmailOrUsername = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(value)) {
    return { email: value };
  } else {
    return { username: value };
  }
};

// this function will validate email
export const validateEmail = (value: string) => {
  if (!value) {
    throw new AppError(
      apiConstants.API_STATUS.BAD_REQUEST,
      "Email cannot be empty"
    );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    throw new AppError(
      apiConstants.API_STATUS.BAD_REQUEST,
      "Email is not valid"
    );
  }
};
