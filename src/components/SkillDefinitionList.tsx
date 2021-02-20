import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import SkillDefinition from "../interfaces/skillDefinition";

const SkillDefinitionList = (props: any) => {
  const [skillDefinitions, setSkillDefinitions] = useState<SkillDefinition[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8001/api/skills/definitions`
        );
        if (result.status !== 200) {
          console.log(result);
          return;
        }
        console.log("result", result)
        setSkillDefinitions(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setSkillDefinitions]);

  console.log(props)

  const listItems = skillDefinitions.map((skillDef, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`skills/${skillDef._id}`}>{skillDef.name}</Link>
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup>{listItems}</ListGroup>
    </>
  );
};

export default SkillDefinitionList;
