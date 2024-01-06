import { getRelativePosition } from "chart.js/helpers";
import Chart from "chart.js/auto";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

function getGradient(chart, threshold = 4) {
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

  gradiendSegment.addColorStop(0, "red");
  gradiendSegment.addColorStop(border, "red");
  gradiendSegment.addColorStop(border, "green");
  gradiendSegment.addColorStop(1, "green");
  return gradiendSegment;
}

(async function () {
  let threshold = 10;

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
            borderWidth: 0,
            fill: "start",
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
        scales: {
          y: {
            beginAtZero: true,
            max: 10, // Adjust this based on your data
            min: 0, // Adjust this based on your data
          },
        },
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, finalChart);

          const _ = finalChart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = finalChart.scales.y.getValueForPixel(canvasPosition.y);
          const spanThresholdValue = document.getElementById(
            "final-threshold-value"
          );
          threshold = dataY;

          // update values for text and chart
          finalChart.options.plugins.annotation.annotations[0].yMin = threshold;
          finalChart.options.plugins.annotation.annotations[0].yMax = threshold;
          finalChart.options.plugins.annotation.annotations[0].borderWidth = 2;
          finalChart.update();

          spanThresholdValue.textContent = threshold.toFixed(2);
        },
        plugins: {
          filler: {
            propagate: false,
          },
          annotation: {
            annotations: [
              {
                type: "line",
                yMin: 10,
                yMax: 10,
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 0,
              },
            ],
          },
        },
      },
    },
  ];

  // TASK 3 CANVAS
  const finalChart = new Chart(
    document.getElementById("t3-fill-the-area"),
    chartConfigs[2]
  );
})();
