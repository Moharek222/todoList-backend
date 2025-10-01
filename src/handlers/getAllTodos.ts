
import { RequestHandler } from "express";
import { allTodos } from '../models/allTodos'


type GetAllTodosResponse = {
    title: string;
    details: string | null;
    isCompleted: boolean;
}[];

export const getAllTodos: RequestHandler<{}, GetAllTodosResponse, {}> = async (req, res) => {
    const todos = await allTodos.find().select('todoId title details isCompleted userId');
    const respone = todos.map((todo) => ({
        title: todo.title,
        details: todo.details,
        isCompleted: todo.isCompleted,
    }))
    res.json(respone);
}