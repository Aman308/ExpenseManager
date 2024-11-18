import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ExpenseChart({ transactions, selectedMonth }) {
  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = new Date(transaction.date).toISOString().slice(0, 7);
    return transactionMonth === selectedMonth;
  });

  const categories = [...new Set(filteredTransactions.map(t => t.description))];
  
  const incomeData = categories.map(category => {
    return filteredTransactions
      .filter(t => t.description === category && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const expenseData = categories.map(category => {
    return filteredTransactions
      .filter(t => t.description === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF'
        }
      },
      title: {
        display: true,
        text: 'Income vs Expenses by Category',
        color: '#9CA3AF'
      }
    }
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <div className="h-[400px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}