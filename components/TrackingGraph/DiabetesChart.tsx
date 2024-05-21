//@ts-nocheck

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const DiabetesChart = ({
  data,
  diabetesPrediction,
}: {
  data: any;
  diabetesPrediction: any;
}) => {
  if (!data.testInstances.length || !diabetesPrediction) {
    return <p>No data available</p>;
  }

  const chartData = {
    labels: data.testInstances,
    datasets: [
      {
        label: "Glucose",
        data: data.glucose,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Blood Pressure",
        data: data.bloodPressure,
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Skin Thickness",
        data: data.skinThickness,
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Insulin",
        data: data.insulin,
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
      {
        label: "BMI",
        data: data.bmi,
        borderColor: "rgba(255,206,86,1)",
        fill: false,
      },
      {
        label: "Diabetes Pedigree Function",
        data: data.diabetesPedigree,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Age",
        data: data.age,
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Pregnancies",
        data: data.pregnancies,
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      annotation: {
        annotations: diabetesPrediction.map((prediction: any, index:number) => ({
          type: "point",
          xValue: data.testInstances[index],
          yValue: data.glucose[index],
          backgroundColor: prediction === 1 ? "red" : "transparent",
          radius: 5,
          borderColor: "red",
          borderWidth: 2,
          label: {
            content: prediction === 1 ? "Diabetes" : "",
            enabled: true,
            position: "top",
          },
        })),
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DiabetesChart;
