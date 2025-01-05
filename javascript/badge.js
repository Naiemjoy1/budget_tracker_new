// badge.js
function updateFinancialSummary(transactions) {
  let netIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      netIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  });

  let savings = netIncome - totalExpenses;

  document.getElementById('net-income').querySelector('h4').textContent = `$${netIncome.toFixed(2)}`;
  document.getElementById('total-expenses').querySelector('h4').textContent = `$${totalExpenses.toFixed(2)}`;
  document.getElementById('savings').querySelector('h4').textContent = `$${savings.toFixed(2)}`;
}
