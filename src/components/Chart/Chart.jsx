import { useState } from "react";
import TextEditor from "./Editor/TextEditor";
import Grid from "./Grid/Grid";
import './css/Chart.css';
const Chart = () => {
    const [housesText, setHousesText] = useState({});
    const [chartAnalysisText, setChartAnalysisText] = useState("odiyamma heatuu");

    const onChartAnalysisUpdate = (text) => {
        setChartAnalysisText(text);
    }
    
    return(
        <div className="chart w-100">
            <div className="grid">
                <Grid />
            </div>
            <div className="editor">
                <TextEditor 
                    AnalysisText={chartAnalysisText}
                    onChartAnalysisUpdate={onChartAnalysisUpdate}
                />
            </div>
        </div>  
    )
}
export default Chart;
