import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../config.json";
import Organisation from "../interfaces/organisation";

const OrganisationList = (props: any) => {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await axios.get(
          `${apiUrl}/organisations`
        );
        if (result.status !== 200) {
          console.log(result);
          return;
        }
        console.log("result", result)
        setOrganisations(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setOrganisations]);

  console.log(props)

  const listItems = organisations.map((organisation, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`organisations/${organisation._id}`}>{organisation.name}</Link>
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup>{listItems}</ListGroup>
    </>
  );
};

export default OrganisationList;
