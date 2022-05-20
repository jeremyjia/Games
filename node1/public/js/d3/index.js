import * as d3 from "https://cdn.skypack.dev/d3@7";
import axios from 'https://cdn.skypack.dev/axios';

const dataSet = async function getData() {
    return await axios.get('/api/data');
}
async function drawChart() {
    const data = await dataSet();
    const svgWidth = 500;
    const svgHeight = 500;
    const barPadding = 5;
    const barWidth = svgWidth / data.data.length;

    let svg = d3.select("svg");
    let width = svg
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    svg
        .selectAll("rect")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("y", (d) => svgHeight - d)
        .attr("height", (d) => d)
        .attr("width", () => barWidth - barPadding)
        .attr("transform", (d, i) => {
            let translate = [barWidth * i, 0];
            return `translate(${translate})`;
        })
        .style("fill", "steelblue");
}
drawChart();