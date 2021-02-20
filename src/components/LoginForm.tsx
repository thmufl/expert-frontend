import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

import authenticationService from "../services/authenticationService";

const LoginForm = (props: any) => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		event.preventDefault();
		const { name, value } = event.currentTarget;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
		event.preventDefault();
		const result = await authenticationService.login(
			credentials.username,
			credentials.password
		);
    setCredentials({
      username: "",
      password: "",
    });
		if (result.error) {
			console.error(result.error);
		}
	};

	return authenticationService.currentUser() ? (
		<Redirect to="/home" />
	) : (
		<>
			<h1>Login</h1>

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formEmail">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="email"
						name="username"
						placeholder="Enter your email"
						autoFocus={true}
						onChange={handleChange}
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
						placeholder="Enter your password"
						onChange={handleChange}
					/>
					<Form.Text className="text-muted">
						We'll never share your data with anyone else.
					</Form.Text>
				</Form.Group>

				<Button
					className="mr-5"
					variant="primary"
					type="submit"
					onClick={handleSubmit}
				>
					Submit
				</Button>
				<Link className="mr-5" to="/register">
					Register
				</Link>
				<Link to="/resetPassword">Reset Password</Link>
			</Form>
		</>
	);
};

export default LoginForm;
