import axios from "axios";
import { apiUrl } from "../config.json"

const expertsService = {
	find: async (skill: string, status: string) => {
		try {
			const result = await axios({
				method: "get",
				url: `${apiUrl}/experts/find?skill=${skill}&status=${status}`,
				headers: {
					"content-type": "application/json",
				}
			});

			if (result.status !== 200) {
				console.error("Error: ", result);
				return { error: result };
			}
			//localStorage.setItem("currentUser", JSON.stringify(result.data));
			return result.data;
		} catch (error) {
			console.log("Error", error);
			return { error };
		}
	}
};

export default expertsService;
