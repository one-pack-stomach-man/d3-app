import * as d3 from 'd3';
var log = console.log;
log('---start')
const data = [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
];
d3.selectAll('svg').data(data).enter().append('circle');
// data(data).enter().append('circle').attr('r', 10).attr('cx', (item, index) => index * 10).attr('cy', 20)
// log(';::::', d3.select('body'));
