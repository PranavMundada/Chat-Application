import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "./../controller/userController.js";
// import { signup, login } from "../controller/authController.js";
import { signup, login, googleLogin, logout, protect, checkAuth } from '../controller/authController.js';

const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.post('/google-login', googleLogin);
userRouter.get('/logout', logout);
userRouter.get('/check-auth', protect, checkAuth);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
