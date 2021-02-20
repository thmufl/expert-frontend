import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "../interfaces/user";

const RegisterForm = (props: any) => {

  const defaultUser: User = {
    _id: "",
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  };

  const [user, setUser] = useState<User>(defaultUser);

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>): void => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
  };

  return (
    <>
      <h1>Register</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Enter your firstname"
            onChange={handleUserChange}
          />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formLastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Enter your lastname"
            onChange={handleUserChange}
          />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleUserChange}
          />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p>{JSON.stringify(user)}</p>
    </>
  );
};

export default RegisterForm;
