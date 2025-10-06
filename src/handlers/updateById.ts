import { RequestHandler } from "express";
import { allTodos } from "../models/allTodos";


interface IRequest {
    title: string;
    details: string | null;
}
interface IResponse {
    message: string;
    title?: string;
    details?: string | null;
}

export const updateById: RequestHandler<{ _id: string }, IResponse, IRequest> = async (req, res) => {
    const { _id } = req.params;
    const { title, details } = req.body;
    const todo = await allTodos.findByIdAndUpdate(_id, { title,details }, { new: true});
    if (!todo) {
        return res.status(400).json({ message: "todo not found" });
    }
    res.json({ message: "todo updated successfully"}).end(todo);
};