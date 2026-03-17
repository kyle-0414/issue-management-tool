import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js에 필요한 기능들을 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: false,
          boxWidth: 12,
          boxHeight: 12,
          padding: 16,
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false } },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const data = {
    labels: ['D-10', 'D-9', 'D-8', 'D-7', 'D-6', 'D-5', 'D-4', 'D-3'],
    datasets: [
      {
        label: 'Created',
        data: [12, 15, 18, 25, 20, 10, 8, 5],
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Dev Resolved',
        data: [6, 8, 11, 13, 18, 16, 13, 10],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'QA Closed',
        data: [8, 10, 12, 15, 22, 18, 15, 12],
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default TrendChart;