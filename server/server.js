import express from "express";
import mongoose from "mongoose";

import { v4 as uuid } from "uuid";
import cors from "cors";

import { Note } from "./models/notes.js";

const app = express();

app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});
app.use(express.json());
app.use(cors());

mongoose
	.connect("mongodb://localhost:27017/markdownApp")
	.then(app.listen(80, () => console.log("Connected")))
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Home"));

app.get("/notes", async (req, res) => {
	try {
		const notes = await Note.find({});
		res.send(notes);
	} catch (error) {
		console.log(error);
	}
});

app.post("/notes", async (req, res) => {
	try {
		let note = req.body;
		note = { ...note, id: uuid() };
		await Note.create(note);
		res.status(201).send(note);
	} catch (error) {
		console.log(error);
	}
});

app.get("/notes/:id", async (req, res) => {
	try {
		let note = await Note.findOne({ id: req.params.id });
		res.send(note);
	} catch (error) {
		console.log(error);
	}
});

app.delete("/notes/:id", async (req, res) => {
	try {
		let note = await Note.remove({ id: req.params.id });
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
	}
});

app.put("/notes/:id", async (req, res) => {
	try {
		let note = await Note.findOne({ id: req.params.id });
		note.title = req.body.title;
		note.content = req.body.content;
		await note.save();
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
});
