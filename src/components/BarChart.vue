<template>
    <div id='barchart'>
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: 'BarChart',
    props: {
        data: Array,
    },
    methods: {
        updateBarChart() {
            const data = this.data;
            console.log(data);
            if (data == undefined || data.length == 0){
                this.clearChart();
                return;
            }

            data.forEach(d => d.time = new Date(d.downloaded_at * 1000));
            console.log(data)
            // var parseDate = d3.time.format("%m/%d/%Y %I:%M:%S %p").parse;
            // var formatDate = d3.time.format("%m/%y");
            // var formatCount = d3.format(",.0f");

            var x = d3.scaleTime().range([0, this.width]);
            var y = d3.scaleLinear().range([this.height, 0]);

            // Determine the first and last dates in the data set
            var timestampExtent = d3.extent(data, d => d.time);
            console.log(timestampExtent);

            // Create one bin per hour
            var hourBins = d3.utcHours(timestampExtent[0], timestampExtent[1], 1);
            console.log(hourBins);

            // Use the histogram layout to create a function that will bin the data
            var binByHour = d3.histogram()
                .value(d => d.time)
                .thresholds(hourBins);

            // Bin the data by hour
            var histData = binByHour(data);
            console.log(histData);

            // Scale the range of the data by setting the domain
            x.domain(d3.extent(timestampExtent));
            y.domain([0, d3.max(histData, d => d.length)]);

            this.mainG.selectAll(".bar")
		        .data(histData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", d => {
                    return "translate(" + x(d.x0) + "," + y(d.length) + ")"; 
                    })
                .attr("width", d =>  x(d.x1) - x(d.x0) -1)
                .attr("height",d => {
                    console.log(this.heigth);
                    console.log(d.length);
                    console.log(y(d.length));
				    return this.height - y(d.length); 
                });

            const transitionDuration = 500;
            const t = d3.transition()
                .duration(transitionDuration);
                
            const xAxis = d3.axisBottom(x)
                .tickArguments([d3.timeHour.every(1)]);

            this.xAxisG.transition(t)
                .call(xAxis);
            
            const yAxis = d3.axisLeft(y)
                .ticks(6);

            this.yAxisG.transition(t)
                .call(yAxis);
        },
        clearChart() {
            console.log('clearing chart');
            this.mainG
                .selectAll('.bar')
                .data([])
                .exit()
                .remove();
        }
    },
    data() {
        return {
            svg: null,
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
        data: function(newData, oldData) {
            console.log('Prop changed: ', newData, ' | was: ', oldData)
            this.updateBarChart();
        }
    },
    mounted() {
        this.mainG = d3
            .select("#barchart")
            .append("svg")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .style(
                "transform",
                `translate(${this.margin.left}px, ${this.margin.top}px)`
            );
        this.xAxisG = this.mainG.append("g")
                .attr("transform", "translate(0," + this.height + ")");

        this.yAxisG = this.mainG.append("g");
    },
}
</script>

<style scoped>

</style>