import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
	id: String,
	title: String,
	content: String,
});

export const Note = mongoose.model("Note", noteSchema);
