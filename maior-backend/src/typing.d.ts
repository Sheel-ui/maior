import { Request } from "express";

interface JwtPayload {
    _id: string;
    email: string;
    name: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}