// TASK 4 - D3 Pie Chart
// set the dimensions and margins of the graph
let width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'pie'
let svg = d3.select("#pie")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.csv("type_Gen.csv", pieChart);

function pieChart(error, typePro) {
  var pieGenerator = d3
    .pie()
    .value(function (d) {
      return d["GENERATION (Megawatthours)"];
    })
    .sort(function (a, b) {
      return a["TYPE OF PRODUCER"].localeCompare(b["TYPE OF PRODUCER"]);
    });

  var arcData = pieGenerator(typePro);
  var color = d3.scaleOrdinal(d3["schemeCategory10"]);
  var arcGenerator = d3.arc().innerRadius(30).outerRadius(100);

  svg.append("g")
    .selectAll("path")
    .data(arcData)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      return color(d.data["TYPE OF PRODUCER"]);
    });

    svg.append("g")
    .append("circle")
    .attr("cx", -150)
    .attr("cy", 150)
    .attr("r", 6)
    .style("fill", "#1f77b4");
    svg.append("g")
    .append("text")
    .attr("x", -130)
    .attr("y", 150)
    .text("Combined Heat and Power, Commercial Power 0.20%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

    svg.append("g")
    .append("circle")
    .attr("cx", -150)
    .attr("cy", 175)
    .attr("r", 6)
    .style("fill", "#ff7f0e");
    svg.append("g")
    .append("text")
    .attr("x", -130)
    .attr("y", 175)
    .text("Combined Heat and Power, Electric Power 0.98%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

    svg.append("g")
    .append("circle")
    .attr("cx", -150)
    .attr("cy", 200)
    .attr("r", 6)
    .style("fill", "#2ca02c");
    svg.append("g")
    .append("text")
    .attr("x", -130)
    .attr("y", 200)
    .text("Combined Heat and Power, Industrial Power 0.58%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

    svg.append("g")
    .append("circle")
    .attr("cx", -150)
    .attr("cy", 225)
    .attr("r", 6)
    .style("fill", "#d62728");
    svg.append("g")
    .append("text")
    .attr("x", -130)
    .attr("y", 225)
    .text("Electric Generators, Electric Utilities 12.92%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

    svg.append("g")
    .append("circle")
    .attr("cx", -150)
    .attr("cy", 250)
    .attr("r", 6)
    .style("fill", "#9467bd");
    svg.append("g")
    .append("text")
    .attr("x", -130)
    .attr("y", 250)
    .text("Electric Generators, Independent Power Producers 85.32%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
}
