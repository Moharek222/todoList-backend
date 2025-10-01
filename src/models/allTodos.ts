import mongoose, { Schema,Types } from 'mongoose';

interface IAllTodos {
    title: string;
    details: string | "";
    isCompleted: boolean;
    userId: Types.ObjectId;
}

const allTodosSchema = new Schema<IAllTodos>({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default: ""
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }
})

export const allTodos = mongoose.model<IAllTodos>("allTodos", allTodosSchema, "alltodos")