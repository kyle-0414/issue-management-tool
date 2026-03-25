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

const TrendChart = ({ viewMode = 'cumulative', issues = [] }) => {
  const totalCreated = issues.length;
  const totalResolved = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const totalClosed = issues.filter(i => i.status === 'Closed').length;

  const labels = ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today'];

  const getCumulativeData = (total) => {
    // 트렌드를 시뮬레이션하기 위해 역순으로 차감 (데이터가 D-7까지 꽉 차 보이도록 완만한 차감)
    const data = [total];
    for (let i = 0; i < 7; i++) {
        // 하루 평균 2~4건씩 증가하는 느낌으로 시뮬레이션
        const decrement = Math.floor(Math.random() * 3 + 2); 
        data.unshift(Math.max(0, data[0] - decrement));
    }
    return data;
  };

  const getDailyData = (total) => {
    // 일일 발생량 시뮬레이션
    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push(Math.floor(Math.random() * 15 + 5));
    }
    // 마지막 값(Today)은 임의로 조정
    data[7] = Math.floor(total / 10) + 2; 
    return data;
  };

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

  const chartData = {
    cumulative: {
      labels,
      datasets: [
        {
          label: `Created (${totalCreated})`,
          data: getCumulativeData(totalCreated),
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: `Resolved (${totalResolved})`,
          data: getCumulativeData(totalResolved),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: `Closed (${totalClosed})`,
          data: getCumulativeData(totalClosed),
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    daily: {
      labels,
      datasets: [
        {
          label: 'Created',
          data: getDailyData(totalCreated),
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          tension: 0.3, pointRadius: 4, pointHoverRadius: 6,
        },
        {
          label: 'Resolved',
          data: getDailyData(totalResolved),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3, pointRadius: 4, pointHoverRadius: 6,
        },
        {
          label: 'Closed',
          data: getDailyData(totalClosed),
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.3, pointRadius: 4, pointHoverRadius: 6,
        },
      ],
    },
  };

  return <Line options={options} data={chartData[viewMode]} />;
};

export default TrendChart;