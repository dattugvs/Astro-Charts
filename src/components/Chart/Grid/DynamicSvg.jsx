import PropTypes from 'prop-types';
import { HouseDetails } from "../helpers";

export default function DynamicSvg({ SvgWidth = HouseDetails.Width * 2, SvgHeight = HouseDetails.Height * 2, Lines = [] }) {

    // Render a single SVG line with the provided properties
    const renderLine = (x1, y1, x2, y2, styleProps, key) => (
        <line 
            key={key} 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            style={{ strokeWidth: "2", ...styleProps }} 
        />
    );

    return (
        <svg width={SvgWidth} height={SvgHeight}>
            {Lines.map((line, index) => renderLine(line.x1, line.y1, line.x2, line.y2, line.style, `line-${index}`))}
        </svg>
    );
}

DynamicSvg.propTypes = {
    SvgWidth: PropTypes.number,
    SvgHeight: PropTypes.number,
    Lines: PropTypes.arrayOf(
        PropTypes.shape({
            x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object
        })
    ).isRequired
};
