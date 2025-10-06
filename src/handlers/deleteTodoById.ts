import { RequestHandler } from "express";
import { allTodos } from "../models/allTodos";





export const deleteTodoById: RequestHandler<{_id:string},{},{}> = async (req, res) => {
    const {_id} = req.params;
    const todo = await allTodos.findByIdAndDelete(_id).select('title');
    if(!todo) 
        return res.status(400).json({message:"todo not found"});
    res.json({message:"todo deleted successfully",todo});
}