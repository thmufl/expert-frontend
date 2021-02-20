import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkillDefinition from "../interfaces/skillDefinition";

const SkillDefinitionDetails = (props: any) => {
  const [skillDefinition, setSkillDefinition] = useState<SkillDefinition>();

  useEffect(() => {
    const load = async () => {
      try {
        console.log("props", props);
        const skillDef = await axios.get(
          `http://localhost:8001/api/skills/definitions/${props.match.params.id}`
        );
        setSkillDefinition(skillDef.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setSkillDefinition, props]);

  return (
    <>
      <p>Skill Definition</p>
      <h2>{skillDefinition?.name}</h2>
      <p>{skillDefinition?.description}</p>
      <h3>Creator</h3>
      <p><Link to={`/persons/${skillDefinition?.creator}`}>{skillDefinition?.creator}</Link></p>

      <p>{JSON.stringify(skillDefinition)}</p>
    </>
  );
};

export default SkillDefinitionDetails;
