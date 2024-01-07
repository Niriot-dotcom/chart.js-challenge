import { getRelativePosition } from "chart.js/helpers";
import Chart from "chart.js/auto";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

let threshold = 10;
let showLine = false;
const chartBgColor = "#aaaaaa50";
const chartFillColor = "#ff648550";

const spanThresholdValue = document.getElementById("final-threshold-value");
const checkboxShowLine = document.getElementById("show-line");

function getGradient(chart) {
  const {
    ctx,
    chartArea: { top, bottom, left, right },
    scales: { x, y },
  } = chart;
  const gradiendSegment = ctx.createLinearGradient(0, bottom, 0, top);
  let border = Math.min(
    1,
    (bottom - y.getPixelForValue(threshold)) / (bottom - top)
  );
  border = Math.max(0, border);

  gradiendSegment.addColorStop(0, chartFillColor);
  gradiendSegment.addColorStop(border, chartFillColor);
  gradiendSegment.addColorStop(border, chartBgColor);
  gradiendSegment.addColorStop(1, chartBgColor);
  return gradiendSegment;
}

function updateLine(chart) {
  chart.options.plugins.annotation.annotations[0].yMin = threshold;
  chart.options.plugins.annotation.annotations[0].yMax = threshold;
}

(async function () {
  const chartConfigs = [
    {},
    {},
    {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Line Chart",
            data: [1, 2, 4, 5, 9, 4, 3, 2, 4, 10],
            fill: "start",
            borderColor: "#ff6485",
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return null;
              return getGradient(chart);
            },
          },
        ],
      },
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, finalChart);
          const _ = finalChart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = finalChart.scales.y.getValueForPixel(canvasPosition.y);
          threshold = dataY;
          spanThresholdValue.value = threshold.toFixed(2);
          updateLine(finalChart);
          finalChart.update();
        },
        scales: {
          y: {
            min: 0,
            max: 10,
          },
        },
        plugins: {
          annotation: {
            annotations: [
              {
                type: "line",
                yMin: 10,
                yMax: 10,
                borderColor: "blue",
                borderWidth: 0,
              },
            ],
          },
        },
      },
    },
  ];

  // TASK 3 CANVAS
  let finalChart = new Chart(
    document.getElementById("t3-fill-the-area"),
    chartConfigs[2]
  );

  spanThresholdValue.addEventListener("change", (e) => {
    e.target.value = Math.min(10, e.target.valueAsNumber);
    e.target.value = Math.max(0, e.target.valueAsNumber);
    e.target.value = parseFloat(e.target.valueAsNumber).toFixed(2);
    threshold = e.target.valueAsNumber;
    updateLine(finalChart);
    finalChart.update();
  });

  checkboxShowLine.addEventListener("click", (e) => {
    showLine = e.target.checked;
    finalChart.options.plugins.annotation.annotations[0].borderWidth = showLine
      ? 2
      : 0;
    updateLine(finalChart);
    finalChart.update();
  });
})();
