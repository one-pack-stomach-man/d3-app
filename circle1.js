import * as d3 from 'd3';

const height = 240
const margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40,
};
const innerRadius = 200
const outerRadius = 300
const padRadius = 300
const padAngle = 3 / 300
const cornerRadius = 8

const fruits = [
    { name: "🍊", count: 21 },
    { name: "🍇", count: 13 },
    { name: "🍏", count: 8 },
    { name: "🍌", count: 5 },
    { name: "🍐", count: 3 },
    { name: "🍋", count: 2 },
    { name: "🍎", count: 1 },
    { name: "🍉", count: 1 }
]
const pieArcData = d3.pie()
    .value(d => d.count)(fruits);


const yAxis = g => g
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select('.domain').remove())

const xAxis = g => g
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    
const arcPie = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padRadius(padRadius)
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

d3.select("#app").html(
    `<svg viewBox="-320 -320 640 640" style="max-width: 640px;" text-anchor="middle" font-family="sans-serif">
                ${pieArcData.map(d => `
                  <path fill="steelblue" d="${arcPie(d)}"></path>
                  <text fill="white" transform="translate(${arcPie.centroid(d).join(",")})">
                    <tspan x="0" font-size="24">${d.data.name}</tspan>
                    <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
                  </text>
                `)}
              </svg>`)