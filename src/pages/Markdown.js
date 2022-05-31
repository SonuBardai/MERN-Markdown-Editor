import { useContext } from "react";

const Markdown = ({ AppContext }) => {
	const { note, setNote } = useContext(AppContext);

	return (
		<>
			<div className="markdown-container">
				<div className="label">Markdown</div>
				<div className="">
					<textarea
						value={note.content}
						id="markdown"
						onChange={(e) => {
							setNote({ ...note, content: e.target.value });
						}}
						placeholder="Enter markdown here..."
					></textarea>
				</div>
			</div>
		</>
	);
};

export default Markdown;
