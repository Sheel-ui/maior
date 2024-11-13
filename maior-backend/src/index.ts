import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/authRoutes";
import ProductRouter from "./routes/dashboardRoutes";
import dbConnection from "./database";

const PORT = process.env.PORT || 8080;

dotenv.config();
dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/dashboard", ProductRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
