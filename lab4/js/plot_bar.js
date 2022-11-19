// TASK 3 - D3 Bar Chart

// get the data
d3.csv("data/mon_stat_gen.csv", BarChart);

function BarChart(error, bardata) {
  // set the dimensions and margins of the graph
let margin_bar = {top: 30, right: 30, bottom: 70, left: 60},
width_bar = 460 - margin.left - margin.right,
height_bar = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  let data = [];
  bardata.forEach(function(d){
    if(d.STATE == "US-TOTAL") {
      data.push(d);
    }
  })
  // X axis
  var x = d3
    .scaleBand()
    .range([100, 700])
    .domain(
      data.map(function (d) {
        return d.MONTH;
      })
    )
    .padding(0.4);

    svg.append("g")
    .attr("transform", "translate(0, 600)")
    .call(d3.axisBottom(x).tickSize(14))
    .selectAll("text")
    .attr("transform", "translate(3, 0)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 42000000]).range([500, 100]);

  svg.
    append("g")
    .call(d3.axisLeft(y).tickSize(10))
    .attr("transform", "translate(100,100)");

  // Bars
  svg.select("#bar")
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
      return 500 - y(d.GENERATION);
    })
    .attr("fill", "steelblue")
    .attr("transform", "translate(0,100)");
}
