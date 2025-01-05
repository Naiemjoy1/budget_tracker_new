//search.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");  
  const startDateInput = document.getElementById("start-date");  // Input for start date
  const endDateInput = document.getElementById("end-date");      // Input for end date

  // Function to handle the search input
  searchInput.addEventListener("input", () => {
      filterTransactions();
  });

  // Function to handle the date range change
  startDateInput.addEventListener("change", () => {
      filterTransactions();
  });

  endDateInput.addEventListener("change", () => {
      filterTransactions();
  });

  // Function to filter transactions
  function filterTransactions() {
      const searchTerm = searchInput.value.toLowerCase();
      const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
      const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

      const filteredTransactions = storedTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);

          // Check if the transaction matches the search term
          const matchesSearchTerm = (
              transaction.transaction.toLowerCase().includes(searchTerm) || // Transaction
              transaction.amount.toString().toLowerCase().includes(searchTerm) || // Amount
              transaction.tag.toLowerCase().includes(searchTerm) || // Tag
              transaction.account.toLowerCase().includes(searchTerm) || // Account
              transaction.status.toLowerCase().includes(searchTerm) // Status
          );

          // Check if the transaction is within the date range
          const matchesDateRange = (
              (!startDate || transactionDate >= startDate) && 
              (!endDate || transactionDate <= endDate)
          );

          return matchesSearchTerm && matchesDateRange;
      });

      updateTransactionTable(filteredTransactions);
  }

  // Function to update the table with filtered transactions
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
            <td>
              <button class="edit-btn" data-id="${transaction.id}">✏️</button>
              <button class="delete-btn" data-id="${transaction.id}">🗑️</button>
            </td>
          `;

          table.appendChild(row);
      });

      // Reattach event listeners for Edit/Delete buttons
      document.querySelectorAll(".edit-btn").forEach((button) => {
          button.addEventListener("click", handleEditTransaction);
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", handleDeleteTransaction);
      });
  }

  // Handle Edit Transaction Button Click
  function handleEditTransaction(event) {
      // Add your edit logic here
  }

  // Handle Delete Transaction Button Click
  function handleDeleteTransaction(event) {
      // Add your delete logic here
  }
});
