import { useState } from 'react';
import { format } from 'date-fns';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import MonthlySelector from './components/MonthlySelector';
import ExpenseChart from './components/ExpenseChart';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Expense Manager</h1>
        <ExpenseForm onSubmit={addTransaction} />
        <MonthlySelector 
          selectedMonth={selectedMonth} 
          onMonthChange={setSelectedMonth} 
        />
      
        <ExpenseTable 
          transactions={transactions} 
          selectedMonth={selectedMonth}
        />
          <ExpenseChart 
          transactions={transactions} 
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
}