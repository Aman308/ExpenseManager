import { format, subMonths, addMonths } from 'date-fns';

export default function MonthlySelector({ selectedMonth, onMonthChange }) {
  const currentDate = new Date(selectedMonth + '-01');

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onMonthChange(format(newDate, 'yyyy-MM'));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    onMonthChange(format(newDate, 'yyyy-MM'));
  };

  return (
    <div className="flex items-center justify-between mb-6 bg-gray-800 p-4 rounded-lg">
      <button
        onClick={handlePrevMonth}
        className="px-4 py-2 text-gray-300 hover:text-white"
      >
        ← Previous Month
      </button>
      <h2 className="text-xl font-semibold text-gray-100">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <button
        onClick={handleNextMonth}
        className="px-4 py-2 text-gray-300 hover:text-white"
      >
        Next Month →
      </button>
    </div>
  );
}