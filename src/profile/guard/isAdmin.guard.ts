import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { UnauthorizedException } from "@nestjs/common";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.authorization.replace("Bearer ", "");
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if (user["role"] !== "admin") {
            throw new UnauthorizedException("Unauthorized!")
        }

        req.user = user
        next()
    } catch (error) {
        if (error.message === 'jwt expired') throw new UnauthorizedException("JWT expired")
        throw error
    }
}