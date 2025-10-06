import { RequestHandler } from "express";
import { IUser, User } from "../models/user";
import bcrypt from "bcrypt";
import { jwtService } from "../services/jwt.service";
import { emailService } from "../services/emailService";
import { body } from "express-validator";
// import { upload } from "../middlewares/multer";

interface IRequest{
        email: string;
        password: string;
        name: string;
    };

    interface IResponse{
        message: string;
        user?: IUser;
        token?: string
    }
        export const registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("name must be between 3 and 20 characters"),
    ];

export const registerHandler: RequestHandler<{}, IResponse, IRequest>= async (req, res) => {
        const { email, password, name } = req.body;
        console.log("body is", req.body);
    
        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: "User already exists, please login" });
            return;
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();
        const token = jwtService.createToken({ id: newUser._id });
        console.log("token is", token);
    
        // await emailService.sendEmailVerificationLink(email, token);
        console.log("email sent");
    
        res.json({
            message: "User registered successfully, please verify your email",
            user: newUser, token: token
        });
    };