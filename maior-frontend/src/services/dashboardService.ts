import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";

const token = localStorage.getItem("token");

export const getAccountId = async (token: string) => {
	try {
		const response = await axios.get(`${API_URL}/accountId`, {
			headers: {
				Authorization: `${token}`,
			},
		});
		return response.data.account_id;
	} catch (error) {
		console.error("Error fetching account details:", error);
		throw new Error("Failed to fetch account details");
	}
};

export const getGraphData = async (type: string) => {
	if (!token) {
		return {
			"message": "Invalid token"
		}
	}
	try {
		const response = await axios.get(`http://localhost:8080/dashboard/${type}` ,{
			headers: {
				Authorization: token,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching account details:", error);
		throw error;
	}
};