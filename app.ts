import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getAllTodos } from "./src/handlers/getAllTodos";
import { addTodo } from "./src/handlers/addTodo";
import Authrouter from "./src/auth/auth.router";
import { isAuthenticated } from "./src/middlewares/isAuthenticated.middleware";
import cookieParser from "cookie-parser";
import { deleteTodoById } from "./src/handlers/deleteTodoById";
import { updateById } from "./src/handlers/updateById";
import { getCompletedTodos } from "./src/handlers/getCompletedTodos";
import { getNotCompletedTodos } from "./src/handlers/getNotCompletedTodos";


dotenv.config();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());


// ==>   APIs   <==

app.use('/api/auth',Authrouter);
app.get('/api/alltodos',isAuthenticated,getAllTodos)
app.get('/api/completedtodos',isAuthenticated,getCompletedTodos)
app.get('/api/notcompletedtodos',isAuthenticated,getNotCompletedTodos)
app.post('/api/addtodo',isAuthenticated,addTodo)
app.delete('/api/:_id/deletetodo',isAuthenticated,deleteTodoById)
app.put('/api/:_id/updatetodo',isAuthenticated,updateById)

// ==>  end of APIs   <==





app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});