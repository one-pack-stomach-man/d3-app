import * as d3 from 'd3';
var log = console.log;
var svg = d3.select("svg");
const height = 120
const innderHeight = height - 15 * 2;
const width = 720
svg.attr('width', width).attr('height', height);
var dataset = [1.2,2.3,0.9,1.5,3.3];				 //数据集
var max = d3.max(dataset);

// 
var xScale = d3.scaleLinear().domain([0, max])
              .range([0, 250]);
var rectHeight = (innderHeight / dataset.length);
svg.selectAll('rect').data(dataset)
  .enter()
  .append('rect')
  .attr('x', 20)
  .attr('y', (d, i) => {
    return i * rectHeight;
  })
  .attr('width', (d, i) => {
    return xScale(d);
  })
  .attr('height',rectHeight-2)
  .attr('fill', 'steelblue');

var xAxis = d3.axisBottom(xScale).ticks(7);

log('ddd, ', d3.axisBottom(xScale))
svg.append("g").attr("transform",`translate(20, ${innderHeight})`).call(xAxis);        

