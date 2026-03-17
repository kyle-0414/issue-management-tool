import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CycleChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Pass Rate (%)' },
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        title: { display: true, text: 'Critical Bugs', color: '#ef4444' },
        grid: { display: false },
      },
      x: { grid: { display: false } },
    },
  };

  const data = {
    labels: ['1차 (전수)', '2차 (변경점)', '3차 (회귀)', '4차 (Ad-hoc)'],
    datasets: [
      {
        type: 'line',
        label: 'Critical Bugs (Remaining)',
        data: [45, 14, 2, 0],
        borderColor: '#ef4444',
        borderWidth: 2,
        borderDash: [5, 5],
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Pass Rate (%)',
        data: [72, 85, 96, 99],
        backgroundColor: [
          'rgba(99, 102, 241, 0.3)',
          'rgba(99, 102, 241, 0.5)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: ['#6366f1', '#6366f1', '#6366f1', '#10b981'],
        borderWidth: 1,
        yAxisID: 'y',
      },
    ],
  };

  return <Chart type="bar" options={options} data={data} />;
};

export default CycleChart;