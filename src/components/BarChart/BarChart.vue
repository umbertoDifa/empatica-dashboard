<template>
  <div id="barchart"></div>
</template>

<script>
import * as d3 from 'd3';
import timeUtils from '../../utils/timeUtils';

export default {
  name: 'BarChart',
  props: {
    data: Array,
  },
  methods: {
    updateBarChart() {
      function updateChartSelection(selection) {
        selection
          .attr('x', 1)
          .attr('transform', d => {
            return 'translate(' + x(timeUtils.floorHour(d.x0)) + ',' + y(d.length) + ')';
          })
          .attr(
            'width',
            d =>
              x(timeUtils.ceilHour(d.x1)) -
              x(timeUtils.floorHour(d.x0)) -
              this.config.marginBetweenBars
          )
          .attr('height', d => {
            return this.height - y(d.length);
          });
      }

      function updateAxes() {
        const xAxis = d3.axisBottom(x);

        this.xAxisG.transition(t).call(xAxis);

        const yAxis = d3.axisLeft(y).ticks(6);

        this.yAxisG.transition(t).call(yAxis);
      }

      const data = this.data;
      console.log(data);
      if (data == undefined || data.length == 0) {
        this.clearChart();
        return;
      }

      data.forEach(d => (d.time = new Date(d.downloaded_at * 1000)));
      console.log(data);

      var x = d3.scaleTime().range([0, this.width - this.margin.left - this.margin.right]);
      var y = d3.scaleLinear().range([this.height, 0]);

      var timestampExtent = d3.extent(data, d => d.time);
      timestampExtent[0] = timeUtils.floorHour(timestampExtent[0]);
      timestampExtent[1] = timeUtils.ceilHour(timestampExtent[1]);

      console.log(timestampExtent);

      // Create one bin per hour
      const binSizeInHours = Math.min(
        50,
        Math.round(Math.abs(timestampExtent[1] - timestampExtent[0]) / 36e5 / 50)
      );
      console.log(
        'binSizeInHours',
        binSizeInHours,
        Math.round(Math.abs(timestampExtent[1] - timestampExtent[0]) / 36e5)
      );
      const hourBins = d3.utcHours(timestampExtent[0], timestampExtent[1], binSizeInHours);
      console.log('bins', hourBins);

      // Use the histogram layout to create a function that will bin the data
      var binByHour = d3
        .histogram()
        .value(d => d.time)
        .thresholds(hourBins);

      // Bin the data by hour
      var histData = binByHour(data);
      console.log(histData);

      // Scale the range of the data by setting the domain
      x.domain(d3.extent(timestampExtent));
      y.domain([0, d3.max(histData, d => d.length)]);

      const t = d3.transition().duration(this.config.transitionDuration);

      const updateSelection = this.mainG.selectAll('.bar').data(histData);
      updateSelection.exit().remove();

      const enterSelection = updateSelection
        .enter()
        .append('rect')
        .style('fill', '#448aff')
        .attr('class', 'bar');

      updateChartSelection.call(this, enterSelection);
      updateChartSelection.call(this, updateSelection.transition(t));

      updateAxes.call(this);
    },
    clearChart() {
      this.mainG.selectAll('.bar').data([]).exit().remove();
    },
    buildContainers() {
      this.mainG = d3
        .select('#barchart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .style('transform', `translate(${this.margin.left}px, ${this.margin.top}px)`);
    },
    buildAxes() {
      this.xAxisG = this.mainG.append('g').attr('transform', 'translate(0,' + this.height + ')');

      this.yAxisG = this.mainG.append('g');
    },
  },
  computed: {
    height() {
      const navBarSize = d3.select('#navbar').node().getBoundingClientRect().height;
      const filtersSize = d3.select('#filters').node().getBoundingClientRect().height;

      return Math.max(
        500,
        window.innerHeight - navBarSize - filtersSize - this.margin.top - this.margin.bottom
      );
    },
  },
  data() {
    return {
      config: {
        transitionDuration: 500,
        marginBetweenBars: 5,
      },
      svg: null,
      width: 800,
      margin: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50,
      },
    };
  },
  watch: {
    data: function (newData, oldData) {
      this.updateBarChart();
    },
  },
  mounted() {
    this.buildContainers();
    this.buildAxes();

    const rect = this.$el.getBoundingClientRect();
    this.width = rect.width;
    this.updateBarChart();
  },
};
</script>
