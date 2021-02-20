import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../config.json";
import UserProfile from "../interfaces/userProfile";
import Organisation from "../interfaces/organisation";

const UserProfileDetails = (props: any) => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [organisations, setOrganisations] = useState<Organisation[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("props", props);
        const profile = await axios.get(
          `${apiUrl}/userProfiles/${props.match.params.id}`
        );
        setUserProfile(profile.data);

        const organisations = await axios.get(
          `${apiUrl}/userProfiles/${props.match.params.id}/organisations`
        );
        setOrganisations(organisations.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setUserProfile, props]);

  // const skillsListItems = [person.skills].map((skill, index) => (
  //   <ListGroup.Item key={index.toString()} action>
  //     <Link to={`/skills/definitions/${skill._id}`}>{skill.definition.name}</Link>
  //     <br/>{skill.confirmedBy.length > 0 ? "confirmed" : "unconfirmed"}
  //   </ListGroup.Item>
  // ));

  const organisationListItems = organisations?.map((org, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`/organisations/${org._id}`}>{org.name}</Link>
    </ListGroup.Item>
  ));

  return (
    <>
      <p>Person</p>
      <h2>{userProfile?.name}</h2>
      <p>{userProfile?.description}</p>
      <p>
        <Link to={`mailto:${userProfile?.email}`}>{userProfile?.email}</Link>
      </p>

      <h3>Skills</h3>
      {/* <ListGroup>{skillsListItems}</ListGroup> */}

      <h3>Organisations</h3>
      <ListGroup>{organisationListItems}</ListGroup>

      <p>{JSON.stringify(userProfile)}</p>
    </>
  );
};

export default UserProfileDetails;
