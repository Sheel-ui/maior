// ensureAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    _id: string;
    email: string;
    name: string;
}


const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(403).json({ message: 'Unauthorized, JWT token is required' });
        return;
    }

    try {
        req.user = jwt.verify(auth, process.env.JWT_SECRET as string) as JwtPayload;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

export default ensureAuthenticated;
