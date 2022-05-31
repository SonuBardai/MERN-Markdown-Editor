import ReactMarkdown from "react-markdown";
import { useContext } from "react";

const Rendered = ({ AppContext }) => {
	const { note } = useContext(AppContext);
	return (
		<>
			<div className="rendered-container">
				<div className="label">Preview</div>
				<div>
					<ReactMarkdown className="rendered-text">
						{note.content}
					</ReactMarkdown>
				</div>
			</div>
		</>
	);
};

export default Rendered;
