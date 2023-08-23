import { TextAreaEnem } from "./components/TextAreaEnem";

function App() {
	return (
		<div className="App">
			<div className="h-screen">
				{/* TOP NAVIGATION */}
				<div className="w-100 py-5 pl-5 font-bold text-xl bg-cyan-500">
					<p className="text-neutral-50">
						Enem Auto Correction App
					</p>
				</div>

				<div className="bg-white pt-10 pb-3 max-h-screen">
					<TextAreaEnem/>
				</div>
			</div>
		</div>
	);
}

export default App;
