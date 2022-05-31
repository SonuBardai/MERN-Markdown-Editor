import { useContext } from "react";
import Tab from "./Tab";
const Tabs = ({ AppContext }) => {
	const { notes, setNote, note, untitled } = useContext(AppContext);

	return (
		<>
			<div className="tabs">
				{notes.map((item) => {
					if (item.id === note.id) {
						return (
							<Tab
								note={item}
								setNote={setNote}
								currentNote={true}
								key={item.id}
								AppContext={AppContext}
							/>
						);
					} else {
						return (
							<Tab
								note={item}
								setNote={setNote}
								key={item.id}
								AppContext={AppContext}
							/>
						);
					}
				})}

				{untitled ? (
					<Tab
						note={{ title: "Untitled", content: "" }}
						currentNote={true}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Tabs;
