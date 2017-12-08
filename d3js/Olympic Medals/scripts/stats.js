var margin = {top: 40, right: 150, bottom: 70, left: 150},
    width = screen.width - margin.left - margin.right -50,
    height = 350 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

// define the lines
var valuelineAverage = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.average); });

var valuelineMedian = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.median); });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var formatNum = d3.format(".2f");
var formatNum0 = d3.format(".0f");
var formatNumS = d3.format(",");


//******************//
//medals 1976-2012//
//******************//
var chart1 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/medals_1976-2012.csv", function(error, data) {
    data.forEach(function(d) {
        d.year = +d.year;
        d.average = +d.average;
        d.median = +d.median;
    });
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.average; })+1]);
    //header
    chart1.append("text")
        .attr("class", "header")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Average and median medals won by country at the olympic games 1976 - 2012");
    //valuelineAverage path
    chart1.append("path")
        .data([data])
        .attr("class", "lineAverage")
        .attr("d", valuelineAverage);
    //valuelineMedian path.
    chart1.append("path")
        .data([data])
        .attr("class", "lineMedian")
        .attr("d", valuelineMedian);
    //average line label
    chart1.append("text")
        .attr("transform", "translate(" + (width+3) + "," + (y(data[0].average)-75) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "steelblue")
        .text("Average");
    //median line label
    chart1.append("text")
        .attr("transform", "translate(" + (width+3) + "," + (y(data[0].median)-43) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "red")
        .text("Median");
    //average dots
    chart1.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .style("fill","steelblue")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.average); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Year: "+d.year + "<br/>"  + "Average: " + formatNum(d.average))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    //median dots
    chart1.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .style("fill","red")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.median); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Year: "+d.year + "<br/>"  + "Median: " + d.median)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    //x Axis
    chart1.append("g")
        .data(data)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")).tickValues(d3.range(1976, 2016, 4)));
    //y Axis
    chart1.append("g")
        .call(d3.axisLeft(y));

});

//******************//
//medals 1996-2012//
//******************//
var chart2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/medals_1996-2012.csv", function(error, data) {
    data.forEach(function(d) {
        d.year = +d.year;
        d.average = +d.average;
        d.median = +d.median;
    });
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.average; })]);
    //header
    chart2.append("text")
        .attr("class", "header")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Average and median medals won by country at the olympic games 1996 - 2012");

    // Add the valueline path.
    chart2.append("path")
        .data([data])
        .attr("class", "lineAverage")
        .attr("d", valuelineAverage);
    chart2.append("text")
        .attr("transform", "translate(" + (width+3) + "," + (y(data[0].average)-25) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "steelblue")
        .text("Average");

    chart2.append("text")
        .attr("transform", "translate(" + (width+3) + "," + y(data[0].median) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "red")
        .text("Median");
    // Add the valueline path.
    chart2.append("path")
        .data([data])
        .attr("class", "lineMedian")
        .attr("d", valuelineMedian);
    chart2.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .style("fill","steelblue")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.average); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Year: "+d.year + "<br/>"  + "Average: " + formatNum(d.average))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    chart2.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .style("fill","red")
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.median); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Year: "+d.year + "<br/>"  + "Median: " + d.median)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // add the x Axis
    chart2.append("g")
        .data(data)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")).tickValues(d3.range(1996, 2016, 4)));
    // add the y Axis
    chart2.append("g")
        .call(d3.axisLeft(y));
});

//******************//
//rio medals gdp//
//******************//
var chart3 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
d3.csv("data/rio_medals_gdp.csv", function(error, data) {
    data.forEach(function(d) {
        d.gdp_per_capita = +d.gdp_per_capita;
        d.Total = +d.Total;
    });

    x.domain(d3.extent(data, function(d) { return d.gdp_per_capita; }));
    y.domain([0, d3.max(data, function(d) { return d.Total; })]);
    //header
    chart3.append("text")
        .attr("class", "header")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Rio olympics medals per country and GDP");
    //dots
    chart3.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3)
        .style("fill","steelblue") // <== Add these
        .attr("cx", function(d) { return x(d.gdp_per_capita); })
        .attr("cy", function(d) { return y(d.Total); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Country: " + d.Country + "<br/>" + "GDP: " + formatNumS(formatNum0(d.gdp_per_capita)) + "<br/>"+"Total Medals: " + d.Total)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    //x Axis
    chart3.append("g")
        .data(data)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // text label for the x axis
    chart3.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("GDP");

    //y Axis
    chart3.append("g")
        .call(d3.axisLeft(y));
    // text label for the y axis
    chart3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",  100 -  margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Medals by country");
});

//******************//
//rio medals population//
//******************//
var chart4 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
d3.csv("data/rio_medals_gdp.csv", function(error, data) {
    data.forEach(function(d) {
        d.population = +d.population;
        d.Total = +d.Total;
    });

    x.domain(d3.extent(data, function(d) { return d.population; }));
    y.domain([0, d3.max(data, function(d) { return d.Total; })]);
    //header
    chart4.append("text")
        .attr("class", "header")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Rio olympics medals per country and the population size");
    //dot
    chart4.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3)
        .style("fill","steelblue") // <== Add these
        .attr("cx", function(d) { return x(d.population); })
        .attr("cy", function(d) { return y(d.Total); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Country: " + d.Country + "<br/>" + "GDP: " + formatNumS(d.population) + "<br/>"+"Total Medals: " + d.Total)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
    //x Axis
    chart4.append("g")
        .data(data)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // text label for the x axis
    chart4.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("Population");
    //y Axis
    chart4.append("g")
        .call(d3.axisLeft(y));
    // text label for the y axis
    chart4.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",  100 -  margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Medals by country");
});


