const svg = d3.select("svg");

const titleText = "Constituency Map of the UK";

const height = +svg.attr("height");
const width = +svg.attr("width");

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
    const xValue = d => d.q;
    const yValue = d => d.r;

    // Offset the map from the topleft corner
    const map = svg.append("g")
        .attr("transform", "translate(50, 100)");

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, xValue), d3.max(data, xValue)])
        .range([0, width - 50]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, yValue), d3.max(data, yValue)])
        .range([0, height - 100]);

    // Add a title to the top of the map
    map.append("text")
        .attr("id", "title")
        .attr("transform", "translate(100,0)")
        .text(titleText);

    // Add constituency circles
    map.selectAll("circle").data(data)
        .enter().append("circle")
        .attr("id", "constituency")
        .attr("cx", d => xScale(xValue(d)))
        .attr("cy", d => height - 100 - yScale(yValue(d)))
        .attr("r", 5);

};

d3.csv("uk_hex.csv").then(data => {
    data.forEach(d => {
    d.q = +d.q;
    d.r = +d.r;
    });
    createMap(data);
});
