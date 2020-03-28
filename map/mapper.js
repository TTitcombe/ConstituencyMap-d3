const svg = d3.select("svg");

const titleText = "Constituency Map of the UK";

const height = +svg.attr("height");
const width = +svg.attr("width");

/**
 * Turn hexmap coordinates into SVG coordinates
 * @param  {array} data    parliamentary constituency data, containing coordinates p,q of hexmap position
 * @return {array}         array of x,y coordinates in svg space
 */
hexToSVG = data => {
    data.forEach(d => {
        d_q = +d.q;
        d.r = +d.r;

        // Offset constituencies on alternate rows
        if (d.r % 2 === 0) {
            d.q = d_q + 0.5;
        } else {
            d.q = d_q;
        }
    });

    // Shortcuts for accessing q and r from data
    const qValue = d => d.q;
    const rValue = d => d.r;

    // Create scales for mapping
    const xScale = d3.scaleLinear()
        .domain([d3.min(data, qValue), d3.max(data, qValue)])
        .range([0, width - 75]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, rValue), d3.max(data, rValue)])
        .range([height - 150, 0]);

    // Find x,y position in SVG space
    data.forEach(d => {
        d.x = xScale(qValue(d));
        d.y = yScale(rValue(d));
    });

    return data;
};

/**
 * Create a map of the UK by representing each parliamentary
 * constituency as an equally sized circle
 * @param  {csv} data CSV file containing hexmap locations of each parliamentary constituency
 * @return {None}
 */
createMap = data => {
    const xValue = d => d.x;
    const yValue = d => d.y;
    const partyValue = d => d.first_party;

    // Offset the chart from the top-left corner
    const chart = svg.append("g")
        .attr("transform", "translate(50, 100)");

    // Add a title to the top of the map
    chart.append("text")
        .attr("id", "title")
        .attr("transform", "translate(50,0)")
        .text(titleText);

    // Define a space for the map
    const map = chart.append("g")
        .attr("transform", "translate(0, 25)"); // Leave space for title at the top of the chart

    // Colour constituency by winning party
    const parties = ["Con", "Lab", "LD", "Green", "Spk", "DUP", "SF", "SDLP", "Alliance", "SNP", "PC"];
    const party_colours = ["#0087dc", "#d50000", "#008066", "#FDBB30", "#969696", "c63939", "#339966", "#007345", "#d4d411", "#FFF95D", "#3F8428"];

    const colourScale = d3.scaleOrdinal(parties, party_colours);

    // Add constituency circles
    map.selectAll("circle").data(data)
        .enter().append("circle")
        //.attr("id", "constituency")
        .attr("cx", d => xValue(d))
        .attr("cy", d => yValue(d))
        .attr("r", 5)
        .attr("fill", d => colourScale(partyValue(d)));
};

d3.csv("data/combined_ge2019.csv").then(data => {
    data = hexToSVG(data);
    createMap(data);
});
