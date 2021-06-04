import * as d3 from 'd3';

window.d3 = d3;
const [width, height] = [960, 500];
const eyeSpace = 100;
const eyeYoffset = 80;
const eyeRadius = 40;
const eyebrowWid = 100;
const eyebrowHeight = 20;
const eyebrowSpace = 40;
const eyebrowYoffset = -80;

var svg = d3.select("svg").attr('width', width).attr('height', height);
const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)

const circle = g.append('circle');

circle.attr('r', height / 2)
  .attr('fill', 'yellow').attr('stroke', 'black');

const eyesG = g.append('g').attr('transform', `translate(0, ${0 - eyeYoffset})`);

const leftEye = eyesG.append('circle').attr('r', eyeRadius).attr('cx', 0 - eyeSpace);
const rightEye = eyesG.append('circle').attr('r', eyeRadius).attr('cx', eyeSpace);

const eyebrowsG = eyesG.append('g');
eyebrowsG
.transition().duration(2000)
  .attr('transform', `translate(0, -40)`)
.transition().duration(2000)
  .attr('transform', `translate(0, 0)`);

const rigEyebrow = eyebrowsG.append('rect').attr('x', eyebrowSpace).attr('y', eyebrowYoffset).attr('width', eyebrowWid).attr('height', eyebrowHeight);
const leftEyebrow = eyebrowsG.append('rect').attr('x', -eyebrowWid - eyebrowSpace).attr('y', eyebrowYoffset).attr('width', eyebrowWid).attr('height', eyebrowHeight);

const mouth = g.append('path').attr('d', d3.arc()
  ({
    innerRadius: 150,
    outerRadius: 180,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2,
  }))


svg.style('background-color', 'steelblue');