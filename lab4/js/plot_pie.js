// TASK 4 - D3 Pie Chart
// set the dimensions and margins of the graph
let width = 450,
  height = 450,
  margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'pie'


d3.csv("type_Gen.csv", pieChart);

function pieChart(error, typePro) {
  let svg = d3
  .select("#pie")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  return svg
}
