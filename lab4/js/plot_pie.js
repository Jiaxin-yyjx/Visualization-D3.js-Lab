// TASK 4 - D3 Pie Chart
function DrawPie(statename, data) {
  // console.log(data);
  // set the dimensions and margins of the graph
  let width = 900,
    height = 500,
    margin = 80;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  let radius = Math.min(width, height) / 2 - margin;

  let svg = d3
    .select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  let typePro = {};
  data.forEach(function (d) {
    if (d.STATE == statename.code) {
      typePro["Combined Heat and Power, Commercial Power"] = d["Combined Heat and Power, Commercial Power"];
      typePro["Combined Heat and Power, Electric Power"] = d["Combined Heat and Power, Electric Power"];
      typePro["Combined Heat and Power, Industrial Power"] = d["Combined Heat and Power, Industrial Power"];
      typePro["Electric Generators, Electric Utilities"] = d["Electric Generators, Electric Utilities"];
      typePro["Electric Generators, Independent Power Producers"] = d["Electric Generators, Independent Power Producers"];
    }
  });

  let pieGenerator = d3
    .pie()
    .value(function (d) {
      return d.value;
    });

  let arcData = pieGenerator(d3.entries(typePro));
  let color = d3.scaleOrdinal(d3["schemeCategory10"]);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  svg
    .append("g")
    .selectAll("path")
    .data(arcData)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("transform", "translate(300, 270)")
    .attr("fill", function (d) {
      return color(d.data.key);
    });

  svg
    .append("g")
    // title
    .append("text")
    .text("2021 " + statename.name + " Electricity Generation by Different Producer")
    .attr("transform", "translate(150, 70)");

  let legend = svg.append("g").attr("transform", "translate(530, 130)");

const sum = Object.values(typePro).reduce((accumulator, value) => {
  return parseInt(accumulator) + parseInt(value);
}, 0);

let power1 = typePro[Object.keys(typePro)[0]]/sum*100, power2 = typePro[Object.keys(typePro)[1]]/sum*100, 
    power3 = typePro[Object.keys(typePro)[2]]/sum*100, power4 = typePro[Object.keys(typePro)[3]]/sum*100,
    power5 = typePro[Object.keys(typePro)[4]]/sum*100;

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
    .text("Commercial Power " + power1.toFixed(2) + "%")
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
    .text("Electric Power " + power2.toFixed(2) + "%")
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
    .text("Industrial Power " + power3.toFixed(2) + "%")
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
    .text("Electric Utilities " + power4.toFixed(2) + "%")
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
    .text("Independent Power Producers " + power5.toFixed(2) + "%")
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle");

  return svg;
}
