import { format } from 'date-fns';

export default function ExpenseTable({ transactions, selectedMonth }) {
  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = format(new Date(transaction.date), 'yyyy-MM');
    return transactionMonth === selectedMonth;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Total Income</h3>
            <p className="mt-2 text-xl font-semibold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Total Expenses</h3>
            <p className="mt-2 text-xl font-semibold text-red-400">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400">Balance</h3>
            <p className={`mt-2 text-xl font-semibold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {filteredTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-red-900 text-red-200'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                    ${transaction.amount.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No transactions for this month. Add your first transaction using the form above.
        </div>
      )}
    </div>
  );
}