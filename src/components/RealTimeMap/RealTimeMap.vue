<template>
  <div id="map"></div>
</template>

<script>
import * as d3all from 'd3';
import * as d3tile from 'd3-tile';
import actions from '../../store/actions';
import { mapActions } from 'vuex';

const d3 = { ...d3all, ...d3tile };

export default {
  name: 'RealTimeMap',
  computed: {
    lastPoint() {
      return this.$store.state.lastDataPoint;
    },
    projection() {
      return d3
        .geoMercator()
        .scale(+this.scale / this.tau)
        .translate([this.width / 2, this.height / 2]);
    },
  },
  data() {
    return {
      processedPoints: 0,
      config: {
        radius: {
          start: 0,
          end: 7,
        },
        opacity: {
          start: 0,
          end: 1,
        },
        transitionTime: 1000,
      },
    };
  },
  watch: {
    lastPoint(newQueue) {
      console.log('showing dot', newQueue);
      //   this.clearDots()
      for (let i = this.processedPoints; i < newQueue.length; i++) {
        this.showDot(newQueue[i].lat, newQueue[i].lon);
        this.processedPoints++;
      }
    },
  },
  methods: {
    clearDots() {
      this.svg.selectAll('circle.old').remove();
    },
    showDot(lat, lon) {
      console.log('showing single dot');
      const circle = this.svg
        .append('circle')
        .attr('r', this.config.radius.start)
        .style('opacity', this.config.opacity.start)
        .attr('transform', () => 'translate(' + this.projection([lon, lat]) + ')');

      circle
        .transition()
        .duration(this.config.transitionTime)
        .ease(d3.easeCubicOut)
        .style('opacity', this.config.opacity.end)
        .attr('r', this.config.radius.end)
        .transition()
        .duration(this.config.transitionTime)
        .ease(d3.easeCubicOut)
        .style('opacity', this.config.opacity.start)
        .attr('r', this.config.radius.start);
    },
  },
  mounted() {
    const pi = Math.PI;
    this.tau = 2 * pi;
    this.scale = 1 << 10;
    this.width = Math.max(960, window.innerWidth);
    this.height = Math.max(500, window.innerHeight);

    const path = d3.geoPath().projection(this.projection);

    const tiles = d3
      .tile()
      .size([this.width, this.height])
      .scale(+this.scale)
      .translate(this.projection([0, 0]))();

    this.svg = d3
      .select('#map')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const raster = this.svg.append('g');
    const image = raster
      .attr('transform', stringify.call(this, tiles.scale, tiles.translate))
      .selectAll('image')
      .data(tiles, d => d);

    image.exit().remove();

    image
      .enter()
      .append('image')
      .attr('xlink:href', d => getTileUrl(d))
      .attr('x', function (d) {
        return d[0] * 256;
      })
      .attr('y', function (d) {
        return d[1] * 256;
      })
      .attr('width', 256)
      .attr('height', 256);

    function stringify(scale, translate) {
      const k = scale / 256,
        r = scale % 1 ? Number : Math.round;
      return (
        'translate(' +
        r(translate[0] * scale) +
        ',' +
        r(translate[1] * scale) +
        ') scale(' +
        k +
        ')'
      );
    }

    function getTileUrl(d) {
      return `http://${'abc'[d[1] % 3]}.tile.openstreetmap.org/${d[2]}/${d[0]}/${d[1]}.png`;
    }
  },
};
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
