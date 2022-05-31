import Markdown from "../pages/Markdown";
import Rendered from "../pages/Rendered";

const Note = ({ AppContext }) => {
	return (
		<>
			<Markdown AppContext={AppContext} />
			<Rendered AppContext={AppContext} />
		</>
	);
};

export default Note;
