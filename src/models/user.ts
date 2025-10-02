import mongoose, { Schema } from "mongoose";


export enum Role {
    User = "user",
    Admin = "admin",
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    role: Role;
}
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: [Role.Admin, Role.User],
        default: Role.User
    },
});

export const User = mongoose.model<IUser>("User", UserSchema, "users");
