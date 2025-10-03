import jwt, { SignOptions } from "jsonwebtoken";
function createToken(
    payload: Record<string, unknown>,
    options: SignOptions = { expiresIn: "30d" }
)
{
    const token = jwt.sign(payload, process.env.secretKey!, options);
    return token;
}

export const jwtService = {
    createToken,
};

export default jwtService;