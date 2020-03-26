const svg = d3.select("svg");

const titleText = "Constituency Map of the UK";

const height = +svg.attr("height");
const width = +svg.attr("width");

const innerHeight = height - 100;
const innnerWidth = width - 50;

/**
 * Turn hexmap coordinates into SVG coordinates
 * @param  {array} dataRow parliamentary constituency data, containing coordinates p,q of hexmap position
 * @return {array}         array of x,y coordinates in svg space
 */
hexToSVG = dataRow => {

};

/**
 * Create a map of the UK by representing each parliamentary
 * constituency as an equally sized circle
 * @param  {csv} data CSV file containing hexmap locations of each parliamentary constituency
 * @return {None}
 */
createMap = data => {
  // Offset the map from the topleft corner
  const map = svg.append("g")
                .attr("transform", "translate(50, 100)");

  // Add a title to the top of the map
  map.append("text")
    .attr("id", "title")
    .attr("transform", "translate(400,0)")
    .text(titleText);
};

d3.csv("uk_hex.csv").then(data => {
  createMap(data);
});
