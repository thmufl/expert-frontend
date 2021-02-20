import Person from "./userProfile";

type SkillDefinition = {
  _id: string;
  name: string;
  description: string;
  creator: Person;
};

export default SkillDefinition;
