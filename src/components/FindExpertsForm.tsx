import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import User from "../interfaces/user";
import Expert from "../interfaces/expert";
import ISkill from "../interfaces/expert";

import expertsService from "../services/expertsService";

const FindExpertsForm = (props: any) => {
	const [query, setQuery] = useState({
		name: "",
		confirmed: true,
	});

	const [experts, setExperts] = useState(Array<Expert>());

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const target = event.target;
		const { type, name } = target;
		const value = type === "checkbox" ? target.checked : target.value;
		event.preventDefault();
		setQuery({ ...query, [name]: value });
	};

	useEffect(() => {
		const reload = async () => {
			let result = new Array<Expert>();
			if (query.name.length > 0) {
				result = await expertsService.find(
					query.name,
					query.confirmed ? "confirmed" : "any"
				);
			}
			setExperts(result);
		};
		reload();
	}, [query, setExperts]);

	const handleSubmit = (event: React.FormEvent<EventTarget>): void => {};

	const getExpertItems = () =>
		experts.map((expert, index) => (
			<ListGroup.Item key={index.toString()} action>
				<Link to={`experts/${expert._id}`}>{expert.name}</Link> -{" "}
				{expert.location} - score: {expert.score}
				{getSkillItems(expert)}
			</ListGroup.Item>
		));

	const getSkillItems = (expert: Expert) => {
		return (
			<ul>
				{expert.skills.map((skill, index) => (
					<li key={index.toString()}>{skill.name} - {skill.status}</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<h1>Find Expert</h1>

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formSkillName">
					<Form.Label>Skill</Form.Label>
					<Form.Control
						type="text"
						name="name"
						placeholder="Enter your search"
						value={query.name}
						onChange={handleChange}
					/>
					<Form.Text className="text-muted">
						We'll never share your data with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formSkillConfirmed">
					<Form.Check
						type="switch"
						name="confirmed"
						label="Confirmed only"
						checked={query.confirmed}
						onChange={handleChange}
					/>
				</Form.Group>
				<ListGroup>{getExpertItems()}</ListGroup>
			</Form>

			<p>{JSON.stringify(query)}</p>
		</>
	);
};

export default FindExpertsForm;
