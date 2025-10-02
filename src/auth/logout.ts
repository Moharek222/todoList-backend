import { RequestHandler } from "express";

interface IResponse{
    message:string
} 


export const logoutHandler:RequestHandler<{},IResponse,{}>=async(req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};