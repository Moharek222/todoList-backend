import type { UserToken } from "./src/interfaces/user-token";
declare global {
    namespace Express {
        interface Request {
            user?: UserToken;
        }
    }
}
