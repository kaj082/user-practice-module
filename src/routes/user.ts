import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { generalHelpers } from "../helper";
import { apiConstants } from "../constants";
import AppError from "../AppError";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // If user already exists, return the user
    const user = await User.findOne({ email });
    if (user) {
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new AppError(
          apiConstants.API_STATUS.BAD_REQUEST,
          "Email and password not valid"
        );
      }
      return res.json(user);
    }

    // Validate the request
    if (!email || !username || !password) {
      throw new AppError(
        apiConstants.API_STATUS.BAD_REQUEST,
        "Email, username, and password are required"
      );
    }

    const validatedUser = generalHelpers.validateEmailOrUsername(email);
    const validatedUsername = generalHelpers.validateEmailOrUsername(username);

    if (!validatedUser.email || !validatedUsername.username) {
      throw new AppError(
        apiConstants.API_STATUS.BAD_REQUEST,
        "Email and password not valid"
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      isAuthenticated: true,
    });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError(apiConstants.API_STATUS.NOT_FOUND, "User Not found");
    }

    user.isAuthenticated = false;
    await user.save();

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
});

// Fetch all users
router.get("/fetch", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
