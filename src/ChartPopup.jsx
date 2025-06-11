import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale, 
  LinearScale,    
  BarElement,  
  LineElement,  
  PointElement   
} from 'chart.js';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement   
);

const ChartPopup = ({ employees, onClose }) => {
  const [chartType, setChartType] = useState('pie'); // 'pie', 'bar', 'line'

  
  const getChartData = () => {
    
    const salaryByDesignation = employees.reduce((acc, emp) => {
      acc[emp.designation] = (acc[emp.designation] || 0) + emp.salary;
      return acc;
    }, {});

    
    const countByDesignation = employees.reduce((acc, emp) => {
      acc[emp.designation] = (acc[emp.designation] || 0) + 1;
      return acc;
    }, {});

    const backgroundColors = [
      '#60a5fa', // blue-400
      '#f87171', // red-400
      '#34d399', // green-400
      '#fbbf24', // amber-400
      '#a78bfa', // violet-400
      '#a3a3a3', // gray-400
      '#e879f9', // fuchsia-400
      '#2dd4bf', // teal-400
    ];

    if (chartType === 'pie' || chartType === 'bar') {
      return {
        labels: Object.keys(salaryByDesignation),
        datasets: [
          {
            label: 'Total Salary (₹)',
            data: Object.values(salaryByDesignation),
            backgroundColor: backgroundColors.slice(0, Object.keys(salaryByDesignation).length),
            borderColor: backgroundColors.map(color => color.replace('0.6', '1')), 
            borderWidth: 1
          }
        ]
      };
    } else if (chartType === 'line') {
      return {
        labels: Object.keys(countByDesignation),
        datasets: [
          {
            label: 'Number of Employees',
            data: Object.values(countByDesignation),
            fill: false,
            borderColor: '#3b82f6', 
            tension: 0.1
          }
        ]
      };
    }
    return { labels: [], datasets: [] };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartType === 'pie' || chartType === 'bar'
          ? 'Total Salary by Designation'
          : 'Number of Employees by Designation',
      },
    },
    
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        
        title: {
            display: true,
            text: chartType === 'bar' ? 'Total Salary (₹)' : 'Number of Employees'
        }
      },
      x: {
        
        title: {
            display: true,
            text: 'Designation'
        }
      }
    } : {},
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto relative">
          <h2 className="text-xl font-bold mb-4">Employee Data Chart</h2>
          <p className="text-center text-gray-600 my-8">No employee data available for charting.</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chartComponent = chartType === 'pie'
    ? <Pie key={chartType} data={getChartData()} options={options} />
    : chartType === 'bar'
      ? <Bar key={chartType} data={getChartData()} options={options} />
      : <Line key={chartType} data={getChartData()} options={options} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4">Employee Data Chart</h2>

        <div className="flex justify-center mb-4 space-x-2">
          <button
            className={`px-4 py-2 rounded transition-colors ${chartType === 'pie' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setChartType('pie')}
          >
            Pie Chart (Salary)
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart (Salary)
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setChartType('line')}
          >
            Line Chart (Count)
          </button>
        </div>

        <div className="h-[300px] w-full"> {}
          {chartComponent}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPopup;