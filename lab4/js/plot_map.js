// TASK 2 - D3 Choropleth Map

function DrawMap(topo, topo2, month_data, type_data) {
  let width = 1000,
    height = 700;

  topo.features.forEach(function (d) {
    topo2.forEach(function (c) {
    if (d.properties.name == c.STATE) {
      d["total"] = c.GENERATION;
    }})
  });
  
  let svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  let colorScale = d3
    .scaleSequential()
    .domain([0, 500000000])
    .interpolator(d3.interpolateBlues);

  // create a tooltip
  var Tooltip = d3
    .select("#tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Map and projection
  let path = d3.geoPath();
  let projection = d3.geoAlbersUsa();

  let mouseOver = function (d) {
    Tooltip.style("opacity", 1);
    d3.selectAll(".State").transition().duration(200).style("opacity", 0.7);
    d3.select(this).transition().duration(200).style("opacity", 1);
  };
  let mousemove = function (d) {
    Tooltip.html(d.properties.name + "<br>Generation: " + parseInt(d.total))
      .style("left", d3.mouse(this)[0] + 70 + "px")
      .style("top", d3.mouse(this)[1] + 50 + "px");
  };
  let mouseLeave = function (d) {
    Tooltip.style("opacity", 0);
    d3.selectAll(".State").transition().duration(200).style("opacity", 1);
  };
  let mouseClick = function(d){
    updatePage(d, month_data, type_data)
  }

  // Draw the map
  svg
    .append("g")
    .attr("transform", "translate(0, 100)")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("id", "just_map")
    // draw each State
    .attr("d", d3.geoPath().projection(projection))
    // set the color of each State
    .attr("fill", function (d) {
      // d.total = data.get(d.id) || 0;
      return colorScale(d.total);
    })
    .style("stroke", "grey")
    .attr("class", function (d) {
      return "State";
    })
    .on("mouseover", mouseOver)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseLeave)
    .on("click", mouseClick);
    
    let zoom = d3.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
    svg.call(zoom);
    function zoomed() {
      svg.selectAll("#just_map").attr("transform", d3.event.transform);
    }

  svg
    .append("g")
    // title
    .append("text")
    .text("2021 Electricity Generation on Map")
    .attr("transform", "translate(300, 100)");

  let y = d3.scaleLinear().domain([0, 500000000]).range([500, 0]);
  svg
    .append("g")
    .call(d3.axisRight(y).tickSize(11))
    .attr("transform", "translate(915, 100)");

  let legend = d3.select("svg").append("g");

  let lg = legend
    .append("linearGradient")
    .attr("id", "grad")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "100%")
    .attr("y2", "0%");

  for (let i = 0; i <= 4; i++) {
    lg.append("stop")
      .attr("offset", ((100 * i) / 4).toString() + "%")
      .attr("stop-color", colorScale((500000000 * i) / 4));
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
