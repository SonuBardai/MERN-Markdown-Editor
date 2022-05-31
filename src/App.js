import Note from "./components/Note";
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

function App() {
	const [note, setNote] = useState({ title: "", content: "" });
	const [notes, setNotes] = useState([]);
	const [alert, setAlert] = useState("");
	const [untitled, setUntitled] = useState(false);
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost/notes")
			.then((res) => {
				setNotes(res.data);
				if (res.data.length) {
					setNote(res.data[0]);
				} else {
					setNote({ title: "", content: "" });
					setUntitled(true);
				}
			})
			.catch((err) => console.log(err));

		const lastTheme = localStorage.getItem("lastTheme");
		if (lastTheme) {
			if (lastTheme === "dark") {
				toggleTheme("dark");
			} else {
				toggleTheme("light");
			}
		} else {
			localStorage.setItem("lastTheme", "dark");
		}
	}, []);

	useEffect(() => {
		const markdown = document.getElementById("markdown");
		markdown.style.height = document.body.scrollHeight + "px";
	}, [note]);

	// CONTEXT
	const saveNote = async () => {
		note.title = note.content
			.slice(0, 12)
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(" ", "");
		const createdNote = await axios.post("http://localhost/notes", note);
		note.id = createdNote.data.id;
		setNotes([...notes, note]);
		setAlert("Note Saved!");
		setTimeout(() => {
			setAlert("");
		}, 1500);
		setUntitled(false);
	};

	const updateNote = async () => {
		await axios.put(`http://localhost/notes/${note.id}`, note);
		const newNotes = notes.map((item) => {
			if (item.id === note.id) {
				item.content = note.content;
				setAlert("Note Updated!");
				setTimeout(() => {
					setAlert("");
				}, 1500);
			}
			return item;
		});
		setNotes(newNotes);
	};

	const removeNote = async () => {
		if (note.id) {
			await axios.delete(`http://localhost/notes/${note.id}`);
			const tempNotes = notes.filter((item) => item.id !== note.id);
			setNotes(tempNotes);
			if (tempNotes.length) {
				setNote(tempNotes[0]);
			} else {
				setNote({ title: "", content: "" });
				setUntitled(true);
			}
			setAlert("Note Deleted!");
			setTimeout(() => {
				setAlert("");
			}, 1500);
		} else {
			setNote({ title: "", content: "" });
		}
	};

	const toggleTheme = (theme) => {
		const root = document.querySelector(":root");
		if (theme === "dark") {
			root.style.setProperty("--bg-1", "#15161a");
			root.style.setProperty("--bg-2", "#2c2d31");
			root.style.setProperty("--bg-3", "#1e1f23");
			root.style.setProperty("--text-1", "#f9fafc");
			setDarkMode(true);
			localStorage.setItem("lastTheme", "dark");
		} else {
			root.style.setProperty("--bg-1", "#f9fafc");
			root.style.setProperty("--bg-2", "#e19d8a");
			root.style.setProperty("--bg-3", "#dddfe3");
			root.style.setProperty("--text-1", "#15161a");
			setDarkMode(false);
			localStorage.setItem("lastTheme", "light");
		}
	};

	return (
		<AppContext.Provider
			value={{
				note,
				setNote,
				notes,
				setNotes,
				alert,
				setAlert,
				darkMode,
				toggleTheme,
				untitled,
				setUntitled,
				saveNote,
				removeNote,
				updateNote,
			}}
		>
			<div className="App">
				<Navbar AppContext={AppContext} />
				<div className="main">
					<Note AppContext={AppContext} />
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
