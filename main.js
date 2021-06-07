import * as d3 from 'd3';
var log = console.log;

const activeRender = (e) => {
    const value = +e.target.value;
    log('1111', value);
    // log('1111', d3);
    n = value
    render();
}

window.onload = () => {
    log('load----------')
    document.querySelector('#nInput').addEventListener('change', activeRender);
}
// window.onunload = () => {
//     document.querySelector('#nInput').removeEventListener('input', activeRender);
// }
window.n = 40;
const render = () => {
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
    const padAngle = 0
    const cornerRadius = 0

    const fruits = new Array(n).fill({ count: 1 })
    log(fruits);
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
        `<div>
        <input type="range" value="${n}" id="nInput" name="volume"
        min="0" max="${n*2}">
        <div>${n}</div>
    </div>
    <svg viewBox="-320 -320 640 640" style="max-width: 640px;" text-anchor="middle" font-family="sans-serif">
                ${pieArcData.map((d, i) => `
                  <path fill="${d3.interpolateRainbow(i / n)}" d="${arcPie(d)}"></path>
                `)}
              </svg>`)
}
render();

            //   <text fill="white" transform="translate(${arcPie.centroid(d).join(",")})">
            //         <tspan x="0" font-size="24">${d.data.name}</tspan>
            //         <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
            //       </text>