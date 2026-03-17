import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SeverityChart = () => {
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  const data = {
    labels: ['Critical', 'Major', 'Minor', 'Trivial'],
    datasets: [
      {
        label: 'Bug Count',
        data: [2, 12, 45, 20],
        backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6', '#94a3b8'],
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default SeverityChart;