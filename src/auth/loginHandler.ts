import { RequestHandler } from "express";
import { IUser, User } from "../models/user";
import jwtService from "../services/jwt.service";
import bcrypt from "bcrypt";
import { body } from "express-validator";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    message: string;
    user?: IUser;
}
    export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    ];

export const loginHandler: RequestHandler<{}, IResponse, IRequest> = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid password" });
        return;
    }

    const token = jwtService.createToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "User logged in successfully", user });
};    