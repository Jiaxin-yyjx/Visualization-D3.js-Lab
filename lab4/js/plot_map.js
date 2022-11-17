// TASK 2 - D3 Choropleth Map
// Load external data and boot
var data = d3.map();
d3.queue()
	.defer(d3.json, "/data/us-states.json")
	.defer(d3.csv, "/data/state_Gen.csv", function (d) {
		data.set(d.STATE_CODE, +d.GENERATION);
	})
	.await(ready);

function ready(error, topo) {
	var doma = [
		0, 50000000, 100000000, 150000000, 200000000, 250000000, 300000000,
		350000000, 400000000, 450000000, 500000000,
	];
	var colorScale = d3
		.scaleThreshold()
		.domain(doma)
		.range(d3.schemeBlues[7]);

	// Map and projection
	var path = d3.geoPath();
	var projection = d3.geoAlbersUsa();

	let mouseOver = function (d) {
		d3.selectAll(".State")
			.transition()
			.duration(200)
			.style("opacity", 0.7);
		d3.select(this).transition().duration(200).style("opacity", 1);
	};

	let mouseLeave = function (d) {
		d3.selectAll(".State").transition().duration(200).style("opacity", 1);
		// d3.select(this).transition().duration(200);
	};

	// Draw the map
	d3.select("#map")
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

	d3.select("#map")
		.append("g")
		// title
		.append("text")
		.text("2021 Electricity Generation on Map")
		.attr("transform", "translate(300, 100)");

	var y = d3.scaleLinear().domain([0, 500000000]).range([500, 0]);
	d3.select("#map")
	.append("g")
	.call(d3.axisRight(y).tickSize(11))
	.attr("transform", "translate(915, 100)");

// var colors = ["blue", "white"];
// var grad = d3
//   .select("#map")
//   .append("g")
//   .append("defs")
//   .append("linearGradient")
//   .attr("id", "grad")
//   .attr("x1", "0%")
//   .attr("x2", "0%")
//   .attr("y1", "0%")
//   .attr("y2", "100%");

// grad
//   .selectAll("stop")
//   .data(colorScale)
//   .enter()
//   .append("stop")
//   .style("stop-color", function (d) {
//     return d;
//   })
//   .attr("offset", function (d, i) {
//     return 100 * (i / (colorScale.length - 1)) + "%";
//   });

d3.select("#map")
	.append("g")
	.append("rect")
	.attr("x", 900)
	.attr("y", 100)
	.attr("width", 15)
	.attr("height", 500)
	.attr("fill", function (d) {
			return colorScale(d.y);
		});
	}