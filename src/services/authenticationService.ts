import axios from "axios";
import { apiUrl } from "../config.json"

const authenticationService = {
	login: async (username: string, password: string) => {
		try {
			const result = await axios({
				method: "post",
				url: `${apiUrl}/auth`,
				headers: {
					"content-type": "application/json",
				},
				data: {
					email: username,
					password: password,
				},
			});

			if (result.status !== 200) {
				console.error("Error: ", result);
				return { error: result };
			}
			localStorage.setItem("currentUser", JSON.stringify(result.data));
			return result.data;
		} catch (error) {
			console.log("Error", error);
			return { error };
		}
	},

	logout: () => {
		localStorage.removeItem("currentUser");
	},

    currentUser: () => {
        const data = localStorage.getItem("currentUser");
		return data ? JSON.parse(data).user : null;
    },

    currentUsername: () => {
        const data = localStorage.getItem("currentUser");
    	return data ? JSON.parse(data).user.name : null;
    },

	requestHeaders: () => {
		const data = localStorage.getItem("currentUser");
		
		if (data) {
			const _data = JSON.parse(data);
			return {
				"content-type": "application/json",
				"x-auth-token": _data.token,
			};
		}
		return {
			"content-type": "application/json",
		};
	},
};

export default authenticationService;
