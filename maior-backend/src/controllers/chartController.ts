import { Request, Response } from "express";
import Account from "../models/Account";
import mongoose from "mongoose";
import axios from "axios";

export const getAccountId = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const userId = new mongoose.Types.ObjectId(req.user?._id);
		const account = await Account.findOne({ user_id: userId });
		if (!account) {
			return res
				.status(404)
				.json({ message: "Account not found for this user." });
		}
		return res.status(200).json(account);
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const getGraphData = async (
	req: Request,
	res: Response,
	endpoint: string
): Promise<Response> => {
	try {
		const { data } = await axios.get(`http://localhost:8000/${endpoint}`);
		if (!data) {
			return res.status(404).json({ message: "Data not Found." });
		}
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const genAiGraphData = async (
	req: Request,
	res: Response,
	endpoint: string
): Promise<void> => {
	try {
		const { query } = req.body;
		const response = await axios.post(`http://localhost:8000/${endpoint}`, {
			query,
		});
		res.status(response.status).json(response.data);
	} catch (error) {
		console.error("Error in forwardGraphRequest:", error);
		res.status(500).json({ type: "error", data: [] });
	}
};

export const genAiInsightsData = async (
	req: Request,
	res: Response,
	endpoint: string
): Promise<void> => {
	try {
		const response = await axios.get(`http://localhost:8000/${endpoint}`);
		res.status(response.status).json(response.data);
	} catch (error) {
		console.error("Error in forwardGraphRequest:", error);
		res.status(500).json({ type: "error", data: [] });
	}
};
