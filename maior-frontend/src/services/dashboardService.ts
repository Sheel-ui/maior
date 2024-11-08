import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";

const token = localStorage.getItem("token");

export const getAccountId = async () => {
	if (!token) {
		return {
			"message": "Invalid token"
		}
	}
	try {
		const response = await axios.get(`${API_URL}/accountId`, {
			headers: {
				Authorization: token,
			},
		});
		return response.data.account_id;
	} catch (error) {
		console.error("Error fetching account details:", error);
		throw error;
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
		console.log(`http://localhost:8080/dashboard/${type}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching account details:", error);
		throw error;
	}
};