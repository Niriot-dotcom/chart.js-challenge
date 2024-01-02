import { getRelativePosition } from "chart.js/helpers";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

(async function () {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const chartConfigs = [
    {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    },
    {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          // "August",
          // "September",
          // "October",
          // "November",
          // "December",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        onClick: (e) => {
          let threshold = 60;
          const canvasPosition = getRelativePosition(e, chart);

          const _ = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
          const spanThresholdValue = document.getElementById("threshold-value");
          threshold = dataY;

          // update values for text and chart
          chart.options.plugins.annotation.annotations[0].yMin = threshold;
          chart.options.plugins.annotation.annotations[0].yMax = threshold;
          chart.options.plugins.annotation.annotations[0].borderWidth = 2;
          chart.update();

          spanThresholdValue.textContent = threshold.toFixed(2);
        },
        plugins: {
          annotation: {
            annotations: [
              {
                type: "line",
                yMin: 60,
                yMax: 60,
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 0,
              },
            ],
          },
        },
      },
    },
    {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          // "August",
          // "September",
          // "October",
          // "November",
          // "December",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: 1,
            fillColor: "rgba(255, 192, 255)",
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          { fill: "origin" }, // 0: fill to 'origin'
          { fill: "+2" }, // 1: fill to dataset 3
          { fill: 1 }, // 2: fill to dataset 1
          { fill: false }, // 3: no fill
          { fill: "-2" }, // 4: fill to dataset 2
          { fill: { value: 25 } }, // 5: fill to axis value 25
        ],
      },
      options: {
        onClick: (e) => {
          let threshold = 60;
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
          annotation: {
            annotations: [
              {
                type: "line",
                yMin: 60,
                yMax: 60,
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 0,
              },
            ],
          },
        },
      },
    },
  ];
  // const labels = Utils.months({ count: 7 });

  // TASK 1 CANVAS
  new Chart(document.getElementById("t1-basic-line-chart"), chartConfigs[0]);

  // TASK 2 CANVAS
  const chart = new Chart(
    document.getElementById("t2-set-threshold"),
    chartConfigs[1]
  );

  // TASK 3 CANVAS
  const finalChart = new Chart(
    document.getElementById("t3-fill-the-area"),
    chartConfigs[2]
  );
})();
