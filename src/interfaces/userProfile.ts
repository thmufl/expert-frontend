import User from "./user";
import SkillDefinition from "./skillDefinition";

type UserProfile = {
  _id: string;
  name: string;
  description: string;
  email: string;
  password: string;
  skills: [
    {
      _id: string;
      definition: SkillDefinition,
      confirmedBy: [User]
    }
  ] | null;
};

export default UserProfile;
