import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import registerSchema from "@/schemes/registerScheme";

export function useRegister() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState("");
	const navigate = useNavigate();

	const registerUser = async (values: z.infer<typeof registerSchema>) => {
		setLoading(true);
		try {
			const response = await axios.post("http://localhost:8080/auth/signup", values, {
				headers: { "Content-Type": "application/json" },
			});
			
			const { success, message, error } = response.data;
			if (success) {
				setTimeout(() => {
					setLoading(false);
					navigate("/login");
				}, 1000);
			} else {
				setResult(error?.details[0].message || message || "Something went wrong!");
				setLoading(false);
			}
		} catch (err) {
			console.error("Error during registration:", err);
			setResult("Something went wrong!");
			setLoading(false);
		}
	};

	return { loading, result, registerUser };
}
