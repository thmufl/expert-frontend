import User from "./user";

type Expert = {
	_id: string;
	name: string;
    location: string;
	skills: [
		{
			name: string;
			status: string;
		}
	];
    score?: number
};

export default Expert;
