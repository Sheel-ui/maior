import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/authRoutes";
import ProductRouter from "./routes/dashboardRoutes";
import mongoose from "mongoose";

dotenv.config(); 

const mongoUrl = process.env.MONGO_CONN as string;
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch((err: Error) => {
		console.error("MongoDB Connection Error:", err);
	});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/dashboard", ProductRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
