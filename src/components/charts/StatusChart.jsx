import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = () => {
  const data = {
    labels: ['Passed', 'Failed', 'Blocked', 'Not Run'],
    datasets: [
      {
        data: [850, 45, 25, 80],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#94a3b8'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } },
    },
  };

  return (
    <div className="relative h-full w-full">
      <Doughnut data={data} options={options} />
      {/* 차트 중앙에 85% 텍스트 표시 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-slate-700">85%</span>
      </div>
    </div>
  );
};

export default StatusChart;