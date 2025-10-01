import mongoose, { Schema, Types } from "mongoose";


interface ICompletedTodos {
    title: string;
    details: string | "";
    isCompleted: boolean;
    userId: Types.ObjectId;
}

const completedTodosSchema = new Schema<ICompletedTodos>({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default: ""
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

export const CompletedTodos = mongoose.model("CompletedTodos", completedTodosSchema, "completedtodos")