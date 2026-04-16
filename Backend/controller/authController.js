import axios from "axios";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// Initialize Google Client
// Raw API implementation implies we don't need OAuth2Client

const jwtSign = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = jwtSign(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

/**
 * GOOGLE LOGIN STRATEGY
 */
export const googleLogin = catchAsync(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new AppError("Google Authorization Code is missing!", 400));
  }

  let userInfo;
  try {
    // 1) Exchange the authorization code for an access token
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    const { access_token } = tokenResponse.data;

    // 2) Use the access token to fetch the user's profile
    const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    userInfo = userResponse.data;
  } catch (error) {
    console.error("Google verify error:", error.response?.data || error.message);
    return next(new AppError("Failed to authenticate with Google", 401));
  }

  const { name, email, picture } = userInfo;

  // 2) Find or Create the user
  let user = await User.findOne({ email });

  if (!user) {
    // We create a random password because the User Schema usually requires one
    const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
    
    user = await User.create({
      name,
      email,
      photo: picture,
      password: randomPassword,
      passwordConfirm: randomPassword, // Only if your schema requires confirmation
      isVerified: true
    });
  }

  // 3) Generate app JWT and send response
  createSendToken(user, 200, res);
});

/**
 * STANDARD SIGNUP
 */
export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

/**
 * STANDARD LOGIN
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  createSendToken(user, 200, res);
});

/**
 * LOGOUT
 */
export const logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000), // expires in 10 seconds
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.cookie("jwt", "loggedout", cookieOptions);
  res.status(200).json({ status: "success" });
};

/**
 * PROTECT MIDDLEWARE
 */
export const protect = catchAsync(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  // Re-add import for promisify since I accidentally replaced it at the top
  const { promisify } = await import("util");
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user no longer exists.", 401));
  }

  if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Password recently changed! Please log in again.", 401));
  }

  req.user = currentUser;
  next();
});

/**
 * CHECK AUTH
 */
export const checkAuth = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});