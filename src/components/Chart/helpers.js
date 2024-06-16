// Dimensions for houses
export const HouseDetails = {
    Width: 80, // Changed to a number for consistency with numerical operations
    Height: 80
};

// Names of planets
export const PlanetNames = {
    Saturn: "Sat",
    Jupiter: "Jup",
    Mars: "Mar",
    Sun: "Su", // maroon
    Moon: "Mo", // grey
    Venus: "Ve", // grey
    Mercury: "Me", // green
    Rahu: "Ra", // coffee
    Ketu: "Ke" // raidum
};

// Aspects associated with each planet
export const PlanetAspects = {
    [PlanetNames.Saturn]: [2, 6, 9], // House numbers for Saturn's aspects
    [PlanetNames.Jupiter]: [4, 6, 8], // House numbers for Jupiter's aspects
    [PlanetNames.Mars]: [3, 6, 7], // House numbers for Mars' aspects,
    [PlanetNames.Sun]: [6],
    [PlanetNames.Moon]: [6],
    [PlanetNames.Venus]: [6],
    [PlanetNames.Mercury]: [6],
    [PlanetNames.Rahu]: [6],
    [PlanetNames.Ketu]: [6],
};

// Styles for aspect lines of each planet
export const PlanetAspectLineStyles = {
    [PlanetNames.Saturn]: { stroke: "blue" }, // Stroke style for Saturn's aspects
    [PlanetNames.Jupiter]: { stroke: "yellow" }, // Stroke style for Jupiter's aspects
    [PlanetNames.Mars]: { stroke: "red" }, // Stroke style for Mars' aspects
    [PlanetNames.Sun]: { stroke: "maroon" },
    [PlanetNames.Moon]: { stroke: "grey" },
    [PlanetNames.Venus]: { stroke: "grey" },
    [PlanetNames.Mercury]: { stroke: "green" },
    [PlanetNames.Rahu]: { stroke: "#6F4E37" },
    [PlanetNames.Ketu]: { stroke: "#BCC6CC" },
};
