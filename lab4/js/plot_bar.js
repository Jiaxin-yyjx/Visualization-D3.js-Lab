// TASK 3 - D3 Bar Chart
function DrawBar(statename, bardata) {
  // set the dimensions and margins of the graph
  let margin = { top: 100, right: 0, bottom: 70, left: 120 },
    width = 760 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  let svg = d3
    .select("#bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let data = [];
  bardata.forEach(function (d) {
    if (d.STATE == statename.code) {
      data.push(d);
    }
  });
console.log(data);

svg
.append("g")
// title
.append("text")
.text("2021 " + statename.name + " Monthly Electricity Generation")
.attr("transform", "translate(100, -25)")
.style("fill", "black");

  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.MONTH;
      })
    )
    .padding(0.4);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(3,0)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.GENERATION;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.MONTH);
    })
    .attr("y", function (d) {
      return y(d.GENERATION);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.GENERATION);
    })
    .attr("fill", "steelblue");

  let brush = d3.brush().extent([[0, 0], [width, height]]).on("start", brushed).on("brush", brushed);
  svg.call(brush);

  function brushed() {
    let extent = d3.event.selection;
    svg.selectAll("rect").classed("selected", function(d) {
      return x(d.MONTH) >= extent[0][0] && 
      x(d.MONTH) <= extent[1][0] && 
      y(d.GENERATION) <= extent[1][1];
    })
  }

  return svg;
}
