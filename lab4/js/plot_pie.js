// TASK 4 - D3 Pie Chart

d3.csv("data/type_Gen.csv", pieChart);

function pieChart(error, data) {
  console.log(data);
  // set the dimensions and margins of the graph
  let width = 900,
    height = 500,
    margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  let radius = Math.min(width, height) / 2 - margin;

  let svg = d3
    .select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  let typePro = [];
  data.forEach(function (d) {
    if (d.STATE == "US-TOTAL") {
      data.push(d);
    }
  });

  let pieGenerator = d3
    .pie()
    .value(function (d) {
      return d["GENERATION (Megawatthours)"];
    })
    .sort(function (a, b) {
      return a["TYPE OF PRODUCER"].localeCompare(b["TYPE OF PRODUCER"]);
    });

  let arcData = pieGenerator(typePro);
  let color = d3.scaleOrdinal(d3["schemeCategory10"]);
  let arcGenerator = d3
    .arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  svg
    .append("g")
    .selectAll("path")
    .data(arcData)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      return color(d.data["TYPE OF PRODUCER"]);
    });

  let legend = svg.append("g").attr("transform", "translate(500, 100)");

  legend
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 6)
    .style("fill", "#1f77b4");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 0)
    .text("Combined Heat and Power,")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 20)
    .text("Commercial Power 0.32%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  legend
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 50)
    .attr("r", 6)
    .style("fill", "#ff7f0e");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 50)
    .text("Combined Heat and Power,")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 70)
    .text("Electric Power 3.22%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  legend
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 100)
    .attr("r", 6)
    .style("fill", "#2ca02c");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 100)
    .text("Combined Heat and Power,")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 120)
    .text("Industrial Power 3.39%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  legend
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 150)
    .attr("r", 6)
    .style("fill", "#d62728");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 150)
    .text("Electric Generators,")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 170)
    .text("Electric Utilities 53.85%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  legend
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 200)
    .attr("r", 6)
    .style("fill", "#9467bd");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 200)
    .text("Electric Generators,")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 220)
    .text("Independent Power Producers 39.22%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  return svg;
}
