// TASK 2 - D3 Choropleth Map
// Load external data and boot
var data = d3.map();
d3.queue()
  .defer(d3.json, "data/us-states.json")
  .defer(d3.csv, "data/state_Gen.csv", function (d) {
    data.set(d.STATE_CODE, +d.GENERATION);
  })
  .await(ready);

function ready(error, topo) {
  let width = 1000,
    height = 700;
  
  let svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  var colorScale = d3
    .scaleSequential()
    .domain([0, 500000000])
    .interpolator(d3.interpolateBlues);

  // Map and projection
  var path = d3.geoPath();
  var projection = d3.geoAlbersUsa();

  let mouseOver = function (d) {
    d3.selectAll(".State").transition().duration(200).style("opacity", 0.7);
    d3.select(this).transition().duration(200).style("opacity", 1);
  };

  let mouseLeave = function (d) {
    d3.selectAll(".State").transition().duration(200).style("opacity", 1);
  };

  // Draw the map
  svg
    .append("g")
    .attr("transform", "translate(0, 100)")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    // draw each State
    .attr("d", d3.geoPath().projection(projection))
    // set the color of each State
    .attr("fill", function (d) {
      d.total = data.get(d.id) || 0;
      return colorScale(d.total);
    })
    .style("stroke", "grey")
    .attr("class", function (d) {
      return "State";
    })
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave);

    svg
    .append("g")
    // title
    .append("text")
    .text("2021 Electricity Generation on Map")
    .attr("transform", "translate(300, 100)");

  var y = d3.scaleLinear().domain([0, 500000000]).range([500, 0]);
  svg
    .append("g")
    .call(d3.axisRight(y).tickSize(11))
    .attr("transform", "translate(915, 100)");

    let legend = d3
    .select("svg")
    .append("g");

  let lg = legend
  .append("linearGradient")
  .attr("id", "grad")
  .attr('x1', '0%')
  .attr('x2', '0%')
  .attr('y1', '100%')
  .attr('y2', '0%');

 for (let i=0; i<=4;i++) {
  lg.append('stop').attr('offset', (100*i/4).toString() + '%').attr('stop-color', colorScale(500000000*i/4))
 }

    legend
    .append("rect")
    .attr("x", 900)
    .attr("y", 100)
    .attr("width", 15)
    .attr("height", 500)
    .attr("fill", "url(#grad)");

    return svg;
}
