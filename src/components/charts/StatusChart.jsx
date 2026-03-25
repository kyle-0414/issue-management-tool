import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ issues = [], testData }) => {
  // testData가 있으면 테스트 케이스 모드로 동작, 없으면 기존 이슈 모드로 동작
  const passed = testData ? testData.passed : issues.filter(i => i.status === 'Closed' || i.status === 'Resolved').length;
  const failed = testData ? testData.failed : issues.filter(i => i.status === 'Open' || i.status === 'Reopened').length;
  const blocked = testData ? testData.blocked : issues.filter(i => i.status === 'In Progress').length;
  const notRun = testData ? testData.notRun : 0;
  const na = testData ? testData.na : 0;
  
  const total = passed + failed + blocked + notRun + na;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  const data = {
    labels: ['Passed', 'Failed', 'Block', 'Not Run', 'NA'],
    datasets: [
      {
        data: [passed, failed, blocked, notRun, na],
        backgroundColor: ['#10b981', '#ef4444', '#f43f5e', '#94a3b8', '#cbd5e1'], 
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
        <span className="text-3xl font-black text-slate-800">{passRate}%</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Passed</span>
      </div>
    </div>
  );
};

export default StatusChart;