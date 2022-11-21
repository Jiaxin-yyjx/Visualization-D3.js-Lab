// TASK 4 - D3 Pie Chart

d3.csv("data/type_Gen.csv", pieChart);

function pieChart(error, data) {
  // console.log(data);
  // set the dimensions and margins of the graph
  let width = 800,
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

  let typePro = [
    {
      "TYPE OF PRODUCER": "Combined Heat and Power, Commercial Power",
      "GENERATION (Megawatthours)": 13147622,
    },
    {
      "TYPE OF PRODUCER": "Combined Heat and Power, Electric Power",
      "GENERATION (Megawatthours)": 132382347,
    },
    {
      "TYPE OF PRODUCER": "Combined Heat and Power, Industrial Power",
      "GENERATION (Megawatthours)": 139607169,
    },
    {
      "TYPE OF PRODUCER": "Electric Generators, Electric Utilities",
      "GENERATION (Megawatthours)": 2216234058,
    },
    {
      "TYPE OF PRODUCER": "Electric Generators, Independent Power Producers",
      "GENERATION (Megawatthours)": 1614168959,
    },
  ];
  // data.forEach((ele) => {
  //   typePro[0]["GENERATION (Megawatthours)"] += parseInt(
  //     ele["Combined Heat and Power, Commercial Power"]
  //   );
  //   typePro[1]["GENERATION (Megawatthours)"] += parseInt(
  //     ele["Combined Heat and Power, Electric Power"]
  //   );
  //   typePro[2]["GENERATION (Megawatthours)"] += parseInt(
  //     ele["Combined Heat and Power, Industrial Power"]
  //   );
  //   typePro[3]["GENERATION (Megawatthours)"] += parseInt(
  //     ele["Electric Generators, Electric Utilities"]
  //   );
  //   typePro[4]["GENERATION (Megawatthours)"] += parseInt(
  //     ele["Electric Generators, Independent Power Producers"]
  //   );
  // });

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
      return color(d.data["TYPE OF PRODUCER"]);
    });

  svg
    .append("g")
    // title
    .append("text")
    .text("2021 United States Electricity Generation by Different Producer")
    .attr("transform", "translate(150, 70)");

  let legend = svg.append("g").attr("transform", "translate(530, 130)");

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
