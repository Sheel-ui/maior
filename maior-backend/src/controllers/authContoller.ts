import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserModel from '../models/User';

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, please log in',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            message: 'Signup successful',
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const errorMsg = 'Invalid credentials';

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};
