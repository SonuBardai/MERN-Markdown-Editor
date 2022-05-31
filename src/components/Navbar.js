import Tabs from "./Tabs";

import { MdDeleteOutline, MdDarkMode, MdLightMode } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { FaMarkdown } from "react-icons/fa";
import { useContext } from "react";

const Navbar = ({ AppContext }) => {
	const {
		note,
		saveNote,
		setNote,
		updateNote,
		removeNote,
		alert,
		setUntitled,
		darkMode,
		toggleTheme,
	} = useContext(AppContext);
	return (
		<>
			<div>
				<nav>
					<div
						style={{
							display: "flex",
							gap: "2rem",
							alignItems: "center",
						}}
					>
						<div className="logo">
							<FaMarkdown className="logo-icon" />
							<span>edit</span>
						</div>

						<Tabs AppContext={AppContext} />

						<button
							className="btn"
							onClick={() => {
								setNote({ title: "", content: "" });
								setUntitled(true);
							}}
						>
							+
						</button>
					</div>
					<div
						style={{
							display: "flex",
							gap: "2rem",
							alignItems: "center",
						}}
					>
						<div className="toggle">
							{darkMode ? (
								<MdLightMode
									className="theme"
									onClick={() => toggleTheme("light")}
								/>
							) : (
								<MdDarkMode
									className="theme"
									onClick={() => toggleTheme("dark")}
								/>
							)}
						</div>

						<MdDeleteOutline
							className="delete-icon"
							onClick={removeNote}
						/>
						<button
							className="save-btn"
							onClick={note.id ? updateNote : saveNote}
						>
							<AiOutlineSave className="save-icon" />
							<span>Save Changes</span>
						</button>
					</div>
				</nav>
			</div>

			{alert ? <div className="alert">{alert}</div> : ""}
		</>
	);
};

export default Navbar;
