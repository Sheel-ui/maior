import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoUrl = process.env.MONGO_CONN as string;
export default () => {
	const connect = () => {
		mongoose
			.connect(mongoUrl)
			.then(() => {
				console.log("MongoDB Connected...");
			})
			.catch((err: Error) => {
				console.error("MongoDB Connection Error:", err);
			});
	};
	connect();
	mongoose.connection.on("disconnected", connect);
};
