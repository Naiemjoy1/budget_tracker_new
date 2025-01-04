document.addEventListener("DOMContentLoaded", () => {
  const addDataBtn = document.getElementById("add-data-btn");
  const modal = document.getElementById("data-modal");
  const closeBtn = modal.querySelector(".close-btn");
  const form = document.getElementById("transaction-form");

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

  addDataBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(form.amount.value);
    if (isNaN(amount)) {
      alert("Please enter a valid number for the amount.");
      return;
    }

    const type = form.type.value;
    const transactionData = {
      date: form.date.value,
      transaction: form.transaction.value,
      amount: amount,
      tag: form.tag.value,
      account: form.account.value,
      status: form.status.value,
      type: type, 
    };

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.unshift(transactionData);

    if (transactions.length > 3) {
      transactions.pop();
    }

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionTable(transactions);

    updateFinancialSummary(transactions);

    form.reset();
    modal.style.display = "none";
  });

  const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  updateTransactionTable(storedTransactions);
  updateFinancialSummary(storedTransactions);
});

function updateTransactionTable(transactions) {
  const table = document.querySelector(".transactions-table tbody");
  table.innerHTML = ""; 

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.transaction}</td>
      <td class="${transaction.type}">$${transaction.amount}</td>
      <td>${transaction.tag}</td>
      <td>${transaction.account}</td>
      <td class="status-${transaction.status}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</td>
    `;

    table.appendChild(row);
  });
}
