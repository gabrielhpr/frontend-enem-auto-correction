import { useState } from "react";


export function TextAreaEnem() {
    const [prediction, setPrediction] = useState('');
    const [essay, setEssay] = useState('');
    const [essayDetails, setEssayDetails] = useState({nRows: 0, nWords: 0});

    let handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({essay: essay})
        };

        try {
            await fetch("http://0.0.0.0:5000/enem_auto_correction/predict", requestOptions)
                .then(response => response.json())
                .then(json => {
                    setPrediction(json[0]['prediction']);
                });
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} >
                <div className="flex flex-start">
                    <div className="mb-2 mr-2 px-5 py-1 rounded-lg border border-gray-400">{essayDetails.nRows} {essayDetails.nRows === 1 ? 'linha' : 'linhas'}</div>
                    <div className="mb-2 px-5 py-1 rounded-lg border border-gray-400">{essayDetails.nWords} {essayDetails.nWords === 1 ? 'palavra' : 'palavras'}</div>
                </div>

                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex justify-between items-center py-2 px-3 text-white border-b dark:border-gray-600">
                        <div>
                            Redação
                        </div>
                        <div className="px-2 py-2 bg-white rounded-md text-black">
                            Nota: {prediction}
                        </div>
                    </div>
                    <div className="flex items-center py-2 px-3 bg-gray-200 text-white">
                        <div>
                            <button className="px-7 py-2.5 text-md font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600 hover:bg-blue-500">
                                RMV2
                            </button>
                        </div>
                        <div className="px-2 py-2 rounded-md text-black">
                            <button className="px-7 py-2.5 text-md font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-600 hover:bg-blue-500">
                                CMTerc
                            </button>
                        </div>
                    </div>
                    <div className="py-2 px-4 bg-white rounded-b-lg ">
                        <label for="editor" className="sr-only">Publish post</label>
                        <textarea id="editor" rows="8"
                            className="
                                block
                                px-2
                                w-full
                                text-base
                                text-gray-800
                                bg-white border-0
                                focus:ring-0
                            "
                            placeholder="Escreva a redação..."
                            required
                            onChange={(e) => {
                                setEssay(e.target.value);
                                setEssayDetails({...essayDetails, nRows: e.target.value.split("\n").length, nWords: e.target.value.split(" ").length});
                            }}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-7 py-2.5 text-md font-medium text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-600 hover:bg-green-500">
                        Avaliar
                    </button>
                </div>
            </form>
        </div>
    )
}

