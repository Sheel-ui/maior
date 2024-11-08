import { Request, Response } from 'express';
import Account from "../models/Account";
import mongoose from "mongoose";
import axios from 'axios';

export const getAccountId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user?._id);
        const account = await Account.findOne({ user_id: userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found for this user." });
        }
        return res.status(200).json(account);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
}

export const getGraphData = async (req: Request, res: Response, endpoint: string): Promise<Response> => {
    try {
        console.log('hi')
        const { data } = await axios.get(`http://localhost:8000/${endpoint}`);
        if (!data) {
            return res.status(404).json({ message: "Data not Found." });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
}