import { AiFillEdit } from "react-icons/ai";
import { useContext } from "react";

const Tab = ({ note, setNote, currentNote, AppContext }) => {
	const { updateNote } = useContext(AppContext);

	return (
		<>
			<div
				className={currentNote ? "tab currentNote" : "tab"}
				onClick={() => {
					setNote(note);
				}}
			>
				<span>{note.title}</span>
				{currentNote ? (
					<AiFillEdit
						onClick={() => {
							const title = prompt(
								"Enter a new Title for the note"
							);
							note.title = title;
							updateNote();
						}}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Tab;
