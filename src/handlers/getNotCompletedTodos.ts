
import { RequestHandler } from "express";
import { allTodos } from '../models/allTodos'


type IResponse = {
    title: string;
    details: string | null;
    isCompleted:boolean;
}[];

export const getNotCompletedTodos: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const todos = await allTodos.find({ isCompleted: false }).select('todoId title details isCompleted userId');
    const respone = todos.map((todo) => ({
        title: todo.title,
        details: todo.details,
        isCompleted: todo.isCompleted,
    })) 
    res.json(respone);
}