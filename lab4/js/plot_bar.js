// TASK 3 - D3 Bar Chart
// get the data
d3.csv("data/mon_stat_gen.csv", BarChart);

function BarChart(error, data) {
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

  d3.select("#bar")
    .append("g")
    .attr("transform", "translate(0, 600)")
    .call(d3.axisBottom(x).tickSize(14))
    .selectAll("text")
    .attr("transform", "translate(3, 0)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 42000000]).range([500, 100]);

  d3.select("#bar")
    .append("g")
    .call(d3.axisLeft(y).tickSize(10))
    .attr("transform", "translate(100,100)");

  // Bars
  d3.select("#bar")
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
