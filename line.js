import { 
    select, 
    csv, 
    scaleLinear, 
    scaleTime,
    scalePoint, 
    max,
    axisLeft,
    axisBottom,
    format,
    extent,
  } from 'd3';
  
  const width = 960
  const height = 500
  const circleR = 8
  
  const render = data => {
  
    const title = 'top 10 most populous countries';
  
    const xValue = d => d.timestamp;
    const xLabel = 'Time';
  
    const yValue = d => d.temperature;
    const yLabel = 'Temperature';
  
    const margin = {
      left: 120,
      right: 20,
      top: 30,
      bottom: 70,
    }
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
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
        
    yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -50)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text(yLabel)
  
  
    const xAxisG = g.append('g').call(xAxis);
    xAxisG.attr('transform', `translate(0, ${innerHeight})`)
      .selectAll('.domain')
        .remove();
    xAxisG.append('text')
      .attr('class', 'label-class')
      .text(xLabel)
      .attr('fill', 'black')
      .attr('x', innerWidth / 2)
      .attr('y', 60)
      .attr('font-size', '16px');
  
    g.append('text')
      .attr('font-size', '30px')
      .attr('y', -8)
      .attr('x', innerWidth / 4)
      .text(title);
  
    g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleR);
  }
  
  csv('./temperature.csv').then(data => {
    console.log('data::', data);
    const renderData = data.map(item => {
      // const keyArr = ['temperature']
      // keyArr.map(key => {
      //   item[key] = +item[key];
      // })
      const temperature = +item['temperature'];
      const timestamp = new Date(item['timestamp']);
  
      return {
        ...item,
        temperature,
        timestamp,
      }
      // console.log('---item: ', item);
    })
    console.log('---data::', renderData);
    render(renderData);
  })
  
  
  
  var svg = select("svg").attr('width', width).attr('height', height);
  