import { 
    select, 
    csv, 
    scaleLinear, 
    scaleBand, 
    max,
    axisLeft,
    axisBottom,
    format,
  } from 'd3';
  
  const width = 960
  const height = 500
  const render = data => {
  
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {
      left: 120,
      right: 20,
      top: 30,
      bottom: 50,
    }
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);
  
    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
  
    console.log('yScale: ', yScale.domain());
  
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    const xAxisFormat = number => format('0.3s')(number).replace('G', 'B')
    const xAxis = axisBottom(xScale).tickFormat(xAxisFormat).tickSize(-innerHeight);
  
    g.append('g').call(axisLeft(yScale))
      .selectAll('.domain, .tick line')
        .remove();
  
    const xAxisG = g.append('g').call(xAxis);
    xAxisG.attr('transform', `translate(0, ${innerHeight})`)
      .selectAll('.domain')
        .remove();
    xAxisG.append('text')
      .attr('class', 'label-class')
      .text('Population')
      .attr('fill', 'black')
      .attr('x', innerWidth / 2)
      .attr('y', 50)
      .attr('font-size', '16px');
  
    g.append('text')
      .attr('font-size', '30px')
      .attr('y', -5)
      .attr('x', innerWidth / 4)
      .text('top 10 most populous countries');
  
    g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());
  }
  
  csv('data.csv').then(data => {
    console.log('data::;', data);
    data.forEach(item => {
      item.population = +item.population * 1000;
    })
    render(data);
  })
  
  
  
var svg = select("svg").attr('width', width).attr('height', height);
  