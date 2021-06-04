import { 
  select, 
  csv, 
  scaleLinear, 
  scalePoint, 
  max,
  axisLeft,
  axisBottom,
  format,
  extent,
} from 'd3';

// acceleration: "12"
  // cylinders: 8
  // displacement: 307
  // horsepower: "130"
  // mpg: 18
  // name: "chevrolet chevelle malibu"
  // origin: "USA"
  // weight: "3504"
  // year: "1970"
const width = 960
const height = 500
const circleR = 8

const render = data => {

  const title = 'top 10 most populous countries';

  const xValue = d => d.mpg;
  const xLabel = 'Population';

  const yValue = d => d.horsepower;
  const yLabel = 'Horsepower';

  const margin = {
    left: 120,
    right: 20,
    top: 30,
    bottom: 70,
  }
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  console.log('yScale: ', yScale.domain());

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const xAxisFormat = number => format('0.3s')(number).replace('G', 'B')
  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisFormat)
    .tickSize(-innerHeight)
    .tickPadding(10);


  const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth);

  const yAxisG = g.append('g').call(yAxis);
  yAxisG.selectAll('.domain')
      .remove();
  yAxisG.append('text').text('dddd')


  const xAxisG = g.append('g').call(xAxis);
  xAxisG.attr('transform', `translate(0, ${innerHeight})`)
    .selectAll('.domain')
      .remove();
  xAxisG.append('text')
    .attr('class', 'label-class')
    .text(xLabel)
    .attr('fill', 'black')
    .attr('x', innerWidth / 2)
    .attr('y', 50)
    .attr('font-size', '16px');

  g.append('text')
    .attr('font-size', '30px')
    .attr('y', -5)
    .attr('x', innerWidth / 4)
    .text(title);

  g.selectAll('circle').data(data)
  .enter().append('circle')
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', circleR);
}

csv('./auto-mpg.csv').then(data => {
  console.log('data::;', data);
  data.forEach(item => {
    item.mpg = +item.mpg;
    item.cylinders = +item.cylinders;
    item.displacement = +item.displacement;
    item.horsepower = +item.horsepower;
    item.weight = +item.weight;
  })
  render(data);
})



var svg = select("svg").attr('width', width).attr('height', height);
