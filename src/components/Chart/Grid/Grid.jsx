import { useState, useCallback } from "react";
import GridItem from "./GridItem";
import '../css/Grid.css';
import { PlanetNames, HouseDetails, PlanetAspects, PlanetAspectLineStyles } from "../helpers";
import DynamicSvg from "./DynamicSvg";

const Grid = ({initialHouseLines}) => {
  // Initial grid row layout
  const gridRows = {
    1: [
      { HouseNumber: 0 },
      { HouseNumber: 1 },
      { HouseNumber: 2 },
      { HouseNumber: 3 },
    ],
    2: [
      { HouseNumber: 11 },
      { HouseNumber: -1, rowSpan: 2, colSpan: 2 },
      { HouseNumber: 4 },
    ],
    3: [
      { HouseNumber: 10 },
      { HouseNumber: 5 },
    ],
    4: [
      { HouseNumber: 9 },
      { HouseNumber: 8 },
      { HouseNumber: 7 },
      { HouseNumber: 6 },
    ]
  };

  // Calculate house coordinates
  const getHouseCoordinates = (width, height) => {
    return {
      0: { x: "0", y: "0" },
      1: { x: `${width * 0.5}`, y: "0" },
      2: { x: `${width * 1.5}`, y: "0" },
      3: { x: `${width * 2}`, y: "0" },
      11: { x: "0", y: `${height * 0.5}` },
      4: { x: `${width * 2}`, y: `${height * 0.5}` },
      10: { x: "0", y: `${height * 1.5}` },
      5: { x: `${width * 2}`, y: `${height * 1.5}` },
      9: { x: "0", y: `${height * 2}` },
      8: { x: `${width * 0.5}`, y: `${height * 2}` },
      7: { x: `${width * 1.5}`, y: `${height * 2}` },
      6: { x: `${width * 2}`, y: `${height * 2}` },
    };
  };
  
  const houseCoordinates = getHouseCoordinates(HouseDetails.Width, HouseDetails.Height);

  // Prepare line coordinates for SVG
  const prepareLineCoordinates = useCallback((houseLineDetails) => {
    let lines = [];
    Object.keys(houseLineDetails).forEach(planet => {
      const planetLines = houseLineDetails[planet].flat();
      const planetLineCoordinates = planetLines.map(line => ({
        x1: houseCoordinates[line.from].x,
        y1: houseCoordinates[line.from].y,
        x2: houseCoordinates[line.to].x,
        y2: houseCoordinates[line.to].y,
        style: { ...PlanetAspectLineStyles[planet] }
      }));
      lines = [...lines, ...planetLineCoordinates];
    });
    return lines;
  }, [houseCoordinates]);

  // State for house lines and texts
  const [houseLines, setHouseLines] = useState([]);
  const [houseText, setHouseText] = useState({});

  // Check if the text contains a specific planet
  const isTextContainingPlanet = (text, planet) => {
    const planetsInText = text.split("\n");
    return planetsInText.includes(planet);
  };

  // Get the destination houses for a given house and planet
  const getDestinationHouse = (houseNumber, planet) => {
    return PlanetAspects[planet].map(toHouse => ({
      from: houseNumber,
      to: (houseNumber + toHouse) % 12
    }));
  };

  // Update lines for a given house and planet
  const checkAndUpdateLine = useCallback((houseNumber, text, planet) => {
    const isPlanetInHouse = isTextContainingPlanet(text, planet);
    let planetLines = [...(houseLines[planet] || [])];
    const isPlanetLineExist = planetLines.some(line => line.from === houseNumber);

    if (isPlanetLineExist && !isPlanetInHouse) {
      planetLines = planetLines.filter(line => line.from !== houseNumber);
    } else if (!isPlanetLineExist && isPlanetInHouse) {
      planetLines.push(...getDestinationHouse(houseNumber, planet));
    }

    setHouseLines(prevState => ({
      ...prevState,
      [planet]: planetLines
    }));
  }, [houseLines]);

  // Update lines for a given house
  const updateHouseLine = (houseNumber, text) => {
    Object.values(PlanetNames).forEach(planet => {
      checkAndUpdateLine(houseNumber, text, planet);
    });
  };

  // Handle text change in a house
  const handleHouseTextChange = (houseNumber, text) => {
    setHouseText(prevState => ({
      ...prevState,
      [houseNumber]: text
    }));
    updateHouseLine(houseNumber, text);
  };

  return (
    <div className="grid-content">
      <table>
        <tbody>
          {Object.entries(gridRows).map(([rowNum, houses]) => (
            <tr key={`row-${rowNum}`}>
              {houses.map(house => (
                <td
                  key={`house-${house.HouseNumber}`}
                  colSpan={house.colSpan || 1}
                  rowSpan={house.rowSpan || 1}
                  width={`${HouseDetails.Width}px`}
                  height={`${HouseDetails.Height}px`}
                >
                  {house.HouseNumber >= 0 ? (
                    <GridItem
                      HouseNumber={house.HouseNumber}
                      HouseText={houseText[house.HouseNumber] || ""}
                      onChangeHouseText={handleHouseTextChange}
                    />
                  ) : (
                    <DynamicSvg
                      SvgWidth={HouseDetails.Width * 2}
                      SvgHeight={HouseDetails.Height * 2}
                      Lines={prepareLineCoordinates(houseLines)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
