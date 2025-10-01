import { RequestHandler} from "express";
import { allTodos } from "../models/allTodos";

type request={
    title:string;
    userId?:string
}

type response={
    title:string;
    details:string|null;
    isCompleted:boolean
}
export const addTodo: RequestHandler<{}, response, request> = async (req, res) => {
    const { title } = req.body;
    const todo = await allTodos.create({ title });
    await todo.save();
    res.json({
        title: todo.title,
        details: todo.details,
        isCompleted: todo.isCompleted,
    });
};