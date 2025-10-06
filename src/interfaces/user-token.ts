import { Role } from "../models/user"
export interface UserToken {
  id: string;
  email: string;
  role: Role; 
}
