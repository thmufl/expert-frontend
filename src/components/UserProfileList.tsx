import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config.json"

import UserProfile from "../interfaces/userProfile";

const UserProfileList = (props: any) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await axios.get(
          `${apiUrl}/userProfiles`
        );
        if (result.status !== 200) {
          console.log(result);
          return;
        }
        console.log("result", result)
        setProfiles(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    load();
  }, [setProfiles]);

  console.log(props)

  const profileItems = profiles.map((profile, index) => (
    <ListGroup.Item key={index.toString()} action>
      <Link to={`userProfiles/${profile._id}`}>{profile.name}</Link>
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup>{profileItems}</ListGroup>
    </>
  );
};

export default UserProfileList;
