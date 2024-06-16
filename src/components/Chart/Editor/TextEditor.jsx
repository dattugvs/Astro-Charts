import { useEffect, useState } from "react";
import '../css/TextEditor.css';
import Contenteditable from "./ContentEditable";
const TextEditor = ({ChartID = 0, AnalysisText, onChartAnalysisUpdate}) => {
    const [analysisPoints, setAnalysisPoints] = useState([]);

    useEffect(() => {
        console.log("AnalysisText:", AnalysisText)
        let list = AnalysisText.split("\n");
        if(list.length === 0) {
            list.push("");
        }
        setAnalysisPoints(list);
    }, [AnalysisText]);

    const handleTextChange = (index, text) => {
        const points = [...analysisPoints];
        points[index] =  text;
        onChartAnalysisUpdate(points.join("\n"));
    }

    const onAddNewPoint = (currentIndex) => {
        const insert = (arr, index, newItem) => [
            // part of the array before the specified index
            ...arr.slice(0, index),
            // inserted item
            newItem,
            // part of the array after the specified index
            ...arr.slice(index)
        ];
        const list = insert(analysisPoints, currentIndex+1, "");
        const updatedText = list.join("\n");
        onChartAnalysisUpdate(updatedText);
    }
 
    return(
        <div className="points">
            <ul>
                {analysisPoints.map((point, index) => {
                    return (
                        <Contenteditable
                            value={point}
                            onChange={(text) => handleTextChange(text, index)}
                            onAddNewPoint={() => onAddNewPoint(index)}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
export default TextEditor;
