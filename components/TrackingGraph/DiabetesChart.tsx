//@ts-nocheck

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { transform } from "next/dist/build/swc";

Chart.register(...registerables);

const DiabetesChart = ({ tracks }: { tracks: any }) => {
  const glucose = tracks.map((item: any) => item.glucose);
  const blood_pressure = tracks.map((item: any) => item.blood_pressure);
  const skin_thickness = tracks.map((item: any) => item.skin_thickness);
  const insulin = tracks.map((item: any) => item.insulin);
  const bmi = tracks.map((item: any) => item.bmi);
  const diabetes_pedigree_function = tracks.map(
    (item: any) => item.diabetes_pedigree_function
  );
  const age = tracks.map((item: any) => item.age);
  const pregnancies = tracks.map((item: any) => item.pregnancies);
  const labels = tracks.map((item: any) =>
    new Date(item.createdAt).toLocaleString()
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Glucose",
        data: glucose,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Blood Pressure",
        data: blood_pressure,
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Skin Thickness",
        data: skin_thickness,
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Insulin",
        data: insulin,
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
      {
        label: "BMI",
        data: bmi,
        borderColor: "rgba(255,206,86,1)",
        fill: false,
      },
      {
        label: "Diabetes Pedigree Function",
        data: diabetes_pedigree_function,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Age",
        data: age,
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Pregnancies",
        data: pregnancies,
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
    },
    scales: {
      x: {
        ticks: {
          // Rotate labels by 45 degrees
          rotation: -45,
          // Adjust font color, size, etc. as needed
          font: {
            size: 12,
            color: "blue", // Change color as needed
            weight: "bold",
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DiabetesChart;
