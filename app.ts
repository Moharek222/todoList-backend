import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getAllTodos } from "./src/handlers/getAllTodos";
import { addTodo } from "./src/handlers/addTodo";


dotenv.config();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.static("public"));


// ==>   APIs   <==


app.get('/api/alltodos',getAllTodos)
app.post('/api/addtodo',addTodo)

// ==>   end of APIs   <==





const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});