<template>
    <div id='barchart'>
        <li v-for="d in downloads" :key="d.downloaded_at">
            {{ d.downloaded_at }}
        </li>
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: 'BarChart',
    methods: {
        init() {
            // width = 600 - margin.left - margin.right,
            // height = 300 - margin.top - margin.bottom;
            const data = this.downloads;
            data.forEach(function(d) { d.time = new Date(d.downloaded_at * 1000); });

            const svg = d3
            .select("#barchart")
            .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .style(
                "transform",
                `translate(${this.margin.left}px, ${this.margin.top}px)`
            );

            // var parseDate = d3.time.format("%m/%d/%Y %I:%M:%S %p").parse;
            // var formatDate = d3.time.format("%m/%y");
            // var formatCount = d3.format(",.0f");

            var x = d3.scaleTime().range([0, this.width]);
            var y = d3.scaleLinear().range([this.height, 0]);

            var xAxis = d3.axisBottom(x).tickArguments([d3.timeHour.every(1)]);
            // .axis()
            // .scale(x)
            // .orient("bottom");
            // .tickFormat(formatDate);

            var yAxis = d3.axisLeft(y)
            // .axis()
            // .scale(y)
            // .orient("left")
            .ticks(6);

            // Determine the first and last dates in the data set
            var timestampExtent = d3.extent(data, function(d) { return d.time; });

            // Create one bin per month, use an offset to include the first and last months
            var hourBins = d3.utcHours(timestampExtent[0], timestampExtent[1], 1);

            // Use the histogram layout to create a function that will bin the data
            var binByHour = d3.histogram()
                .value(function(d) { return d.time; })
                .thresholds(hourBins);

            // Bin the data by hour
            var histData = binByHour(data);
            console.log(histData);

            // Scale the range of the data by setting the domain
            x.domain(d3.extent(timestampExtent));
            y.domain([0, d3.max(histData, d => d.length)]);

            svg.selectAll(".bar")
		        .data(histData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) {
                    return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                // .attr("y", function(d) { return y(d.y); })
                .attr("height",d => {
                    console.log(this.heigth);
                    console.log(d.length);
                    console.log(y(d.length));
				    return this.height - y(d.length); 
			    });
        },
    },
    computed: {
        downloads() {
            console.log('updating computed barchar'); 
            return Object.values(this.$store.state.downloads);
        },
    },
    data() {
        return {
            width: 750,
            height: 400,
            margin: {
                top: 50,
                right: 50,
                left: 50,
                bottom: 50,
            },
        };
    },
    watch: {
        downloads: function() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
}
</script>

<style scoped>

</style>