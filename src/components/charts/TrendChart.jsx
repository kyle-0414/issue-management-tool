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

const TrendChart = ({ viewMode = 'cumulative' }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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

  // 보기 방식에 따른 데이터셋 구성
  const chartData = {
    cumulative: {
      labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today'],
      datasets: [
        {
          label: 'Created (125)',
          data: [40, 52, 65, 80, 95, 105, 115, 125],
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Resolved (108)',
          data: [30, 42, 55, 68, 80, 90, 100, 108],
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Closed (101)',
          data: [25, 35, 48, 62, 75, 85, 95, 101],
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    daily: {
      labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today'],
      datasets: [
        {
          label: 'Created (12)',
          data: [15, 18, 25, 20, 10, 8, 15, 12],
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Resolved (10)',
          data: [10, 13, 18, 16, 13, 10, 12, 10],
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Closed (8)',
          data: [8, 12, 22, 18, 15, 8, 10, 8],
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
  };

  return <Line options={options} data={chartData[viewMode]} />;
};

export default TrendChart;