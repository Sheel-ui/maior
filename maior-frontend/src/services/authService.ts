import axios from "axios";
import { z } from "zod";
import registerSchema from "@/schemes/registerScheme";
import loginSchema from "@/schemes/loginScheme";

const API_URL = "http://localhost:8080/auth";

export async function loginUser(values: z.infer<typeof loginSchema>) {
	try {
		const response = await axios.post(`${API_URL}/login`, values);
		const { success, message, jwtToken, name, error } = response.data;
		return { success, jwtToken, name, message, error };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Extract the specific error message from the response data
			const { message } = error.response.data;
			return { success: false, error: message || "Something went wrong!" };
		} else {
			console.error("Login error:", error);
			return { success: false, error: "Something went wrong!" };
		}
	}
}

export const registerUser = async (values: z.infer<typeof registerSchema>) => {
	try {
		const response = await axios.post(`${API_URL}/signup`, values, {
			headers: { "Content-Type": "application/json" },
		});
		const { success, message, error } = response.data;
		return { 
			success, 
			message: success ? "" : message || error?.details[0]?.message || "Registration failed."
		};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Extract the specific error message from the response data
			const { message } = error.response.data;
			return { success: false, message: message || "Something went wrong!" };
		} else {
			console.error("Error during registration:", error);
			return { success: false, message: "Something went wrong!" };
		}
	}
};
