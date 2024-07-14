import React from 'react';
import { Line } from 'react-chartjs-2';

const HealthChart = ({ healthData }) => {
  const dates = healthData.map(data => new Date(data.date).toLocaleDateString());
  const bp = healthData.map(data => parseInt(data.bp));
  const sugar = healthData.map(data => parseInt(data.sugar));
  const weight = healthData.map(data => parseInt(data.weight));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'BP Levels',
        data: bp,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Sugar Levels',
        data: sugar,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Weight',
        data: weight,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      }
    ]
  };

  return <Line data={data} />;
};

export default HealthChart;
