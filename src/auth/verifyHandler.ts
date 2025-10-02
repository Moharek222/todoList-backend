// import { RequestHandler } from "express";
// import { User } from "../models/user";
// import jwt from "jsonwebtoken";

// interface IResponse {
//     message: string;
// }
// export const verifyHandler: RequestHandler<{email:string,token:string}, IResponse,{}> = async (req, res) => {
//     const { email, token } = req.params;
//     console.log("params are", req.params);

//     const user = await User.findOne({ email });
//     if (!user) {
//         res.status(400).json({ message: "User not found" });
//         return;
//     }
//     try {
//         jwt.verify(token, process.env.secretKey!);
//         if (user.isEmailVerified) {
//             res.status(400).json({ message: "email already verified" });
//             return;
//         }
//         user.isEmailVerified = true;
//         await user.save();
//         res.json({ message: "email verified successfully" });
//     } catch (error) {
//         res.status(400).json({ message: "link expired" });
//         return;
//     }
// };