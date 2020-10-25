<template>
  <div id="map"></div>
</template>

<script>
import * as d3all from 'd3'
import * as d3tile from 'd3-tile'

const d3 = {...d3all, ...d3tile};

export default {
  name: 'Map',
  mounted () {
    const pi = Math.PI,
        tau = 2 * pi;
    const scale = 1 << 10;
    const width = Math.max(960, window.innerWidth),
        height = Math.max(500, window.innerHeight);

    const projection = d3.geoMercator()
        .scale(+scale / tau)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    const tiles = d3.tile()
        .size([width, height])
        .scale(+scale)
        .translate(projection([0, 0]))()

    const svg = d3.select("#map")
        .append('svg')
        .attr("width", width)
        .attr("height", height);

    const raster = svg.append("g");
    const image = raster
        .attr("transform", stringify(tiles.scale, tiles.translate))
        .selectAll("image")
        .data(tiles, d => d);

    image.exit().remove();

    image.enter()
        .append("image")
        .attr("xlink:href", d => getTileUrl(d))
        .attr("x", function(d) { return d[0] * 256; })
        .attr("y", function(d) { return d[1] * 256; })
        .attr("width", 256)
        .attr("height", 256);

    showDot(43,-75);

    function showDot(lat, lon){
        svg.append("circle")
            .attr("r",5)
            .attr("transform", () => "translate(" + projection([lon,lat]) + ")");
    }

    function stringify(scale, translate) {
        const k = scale / 256, r = scale % 1 ? Number : Math.round;
        return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
    }

    function getTileUrl(d){
        return `http://${'abc'[d[1] % 3]}.tile.openstreetmap.org/${d[2]}/${d[0]}/${d[1]}.png`;
    }
  },
};
</script>
