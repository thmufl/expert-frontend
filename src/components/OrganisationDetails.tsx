import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../config.json";
import Organisation from "../interfaces/organisation";

const OrganisationDetails = (props: any) => {
  const [organisation, setOrganisation] = useState<Organisation>();

  useEffect(() => {
    const load = async () => {
      try {
        console.log("props", props);
        const org = await axios.get(
        `${apiUrl}/organisations/${props.match.params.id}`
        );
        setOrganisation(org.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setOrganisation, props]);

  const memberListItems = organisation?.members.map((member, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`/userProfiles/${member._id}`}>{member.name}</Link>
    </ListGroup.Item>
  ));

  const boardListItems = organisation?.members.map((member, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`/userProfiles/${member._id}`}>{member.name}</Link>
    </ListGroup.Item>
  ));

  const suborganisationListItems = organisation?.suborganisations.map((org, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`/organisations/${org._id}`}>{org.name}</Link>
    </ListGroup.Item>
  ));

  return (
    <>
      <p>Organisation</p>
      <h2>{organisation?.name}</h2>
      <p>{organisation?.description}</p>
      <h3>Director</h3>
      <Link to={`/profileDetails/${organisation?.director._id}`}>{organisation?.director.name}</Link>
      <h3>Board</h3>
      <ListGroup>{boardListItems}</ListGroup>
      <h3>Members</h3>
      <ListGroup>{memberListItems}</ListGroup>
      <h3>Suborganisations</h3>
      <ListGroup>{suborganisationListItems}</ListGroup>

      <p>{JSON.stringify(organisation)}</p>
    </>
  );
};

export default OrganisationDetails;
