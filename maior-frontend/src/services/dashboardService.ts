import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";


export const getAccountId = async (token: string) => {
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

export const getLineGraph = async () => {
	try {
		const response = await axios.get("http://localhost:8000/line");
		return response.data;
	} catch (error) {
		console.error("Error fetching account details:", error);
		throw error;
	}
};

export const getBarGraph = async (token: string) => {
	try {
		const response = await axios.get("http://localhost:8080/dashboard/bar",{
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