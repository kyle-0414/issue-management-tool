import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = () => {
  const data = {
    labels: ['Passed', 'Failed', 'Blocked', 'Not Run', 'NA'],
    datasets: [
      {
        data: [850, 125, 25, 0, 20],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#94a3b8', '#cbd5e1'],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} cases`
        }
      }
    },
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-1">
        <span className="text-3xl font-black text-slate-800">85%</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Passed</span>
      </div>
    </div>
  );
};

export default StatusChart;