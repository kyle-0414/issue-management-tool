import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SeverityChart = ({ issues = [] }) => {
  const counts = {
    Critical: issues.filter(i => i.severity === 'Critical').length,
    Major: issues.filter(i => i.severity === 'Major').length,
    Minor: issues.filter(i => i.severity === 'Minor' || i.severity === 'Trivial' || !['Critical', 'Major'].includes(i.severity)).length,
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, beginAtZero: true },
      y: { grid: { display: false } },
    },
  };

  const data = {
    labels: ['Critical', 'Major', 'Minor'],
    datasets: [
      {
        label: 'Bug Count',
        data: [counts.Critical, counts.Major, counts.Minor],
        backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6'],
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default SeverityChart;