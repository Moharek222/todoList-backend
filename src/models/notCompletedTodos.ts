import mongoose, { Schema, Types } from "mongoose";



interface INotCompletedTodos {
    title: string;
    details: string | "";
    isCompleted: boolean;
    userId: Types.ObjectId;
}

const notCompletedTodosSchema = new Schema<INotCompletedTodos>({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default:""
    },
    isCompleted: {
        type: Boolean
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
    
export const notCompletedTodos = mongoose.model("notCompletedTodos", notCompletedTodosSchema,"notcompletedtodos")
