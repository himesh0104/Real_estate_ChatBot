import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalysisChart = ({ chartData, type = 'line' }) => {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <div className="text-center p-4 text-muted">
        No chart data available for the selected filters.
      </div>
    );
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Price per sq.ft (₹)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Demand Score',
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                // Price data
                label += new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                }).format(context.parsed.y);
              } else {
                // Demand score
                label += context.parsed.y.toFixed(1) + '/100';
              }
            }
            return label;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset, index) => {
      const isPriceData = dataset.label.toLowerCase().includes('price');
      return {
        ...dataset,
        yAxisID: isPriceData ? 'y' : 'y1',
        borderColor: isPriceData ? '#4361ee' : '#e63946',
        backgroundColor: isPriceData ? 'rgba(67, 97, 238, 0.1)' : 'rgba(230, 57, 70, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: isPriceData ? '#4361ee' : '#e63946',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        tension: 0.3,
        fill: true,
      };
    }),
  };

  return (
    <div style={{ height: '350px', position: 'relative' }}>
      {type === 'line' ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};

AnalysisChart.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        yAxisID: PropTypes.string,
      })
    ),
  }),
  type: PropTypes.oneOf(['line', 'bar']),
};

export default AnalysisChart;