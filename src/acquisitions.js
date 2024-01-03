import { getRelativePosition } from "chart.js/helpers";
import Chart from "chart.js/auto";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

(async function () {
  const chartConfigs = [
    {},
    {},
    {
      type: "line",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Line Chart",
            data: [1, 2, 4, 5, 9, 4, 3, 2, 4, 10],
            fill: {
              value: 4,
              target: { value: 3 },
              below: "#e7cace",
            },
            fillColor: "rgba(255, 192, 255)",
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 50, // Adjust this based on your data
            min: 0, // Adjust this based on your data
          },
        },
        onClick: (e) => {
          let threshold = 10;
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
