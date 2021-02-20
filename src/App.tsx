// eslint-disable-next-line
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


import "./App.css";

import SideNav from "./components/SideNav";
import Home from "./components/Home";
import FindExpertsForm from "./components/FindExpertsForm";
import OrganisationList from "./components/OrganisationList";
import OrganisationDetails from "./components/OrganisationDetails";
import SkillDefinitionList from "./components/SkillDefinitionList";
import SkillDefinitionDetails from "./components/SkillDefinitionDetails";
//import PersonList from "./components/PersonList";
//import PersonDetails from "./components/PersonDetails";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import authenticationService from "./services/authenticationService";

function App() {
  return (
    <Container>
      <Row>
        <Col sm={2}>
          <div>
            { authenticationService.currentUsername() }
          </div>
          <SideNav
            items={[
              { title: "Home", path: "/home" },
              { title: "Find Expert", path: "/experts/find" },
              { title: "Organisations", path: "/organisations" },
              { title: "Skill Definitions", path: "/skills/definitions" },
              { title: "Login", path: "/login" },
              { title: "Register", path: "/register" },
            ]}
          />
          <Button variant="secondary" onClick={authenticationService.logout}>Logout</Button>
        </Col>
        <Col sm={10}>
          <Switch>
            <Route path="/experts/find" component={FindExpertsForm} />
            <Route path="/skills/definitions/:id" component={SkillDefinitionDetails} />
            <Route path="/skills/definitions" component={SkillDefinitionList} />
            <Route path="/organisations/:id" component={OrganisationDetails} />
            <Route path="/organisations" component={OrganisationList} />

            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/home" component={Home} />
            
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
