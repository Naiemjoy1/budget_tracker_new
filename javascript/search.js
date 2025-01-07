// search.js
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
  
    searchInput.addEventListener("input", () => {
      filterTransactions();
    });
  
    startDateInput.addEventListener("change", () => {
      filterTransactions();
    });
  
    endDateInput.addEventListener("change", () => {
      filterTransactions();
    });
  
    function filterTransactions() {
      const searchTerm = searchInput.value.toLowerCase();
      const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
      const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
      const filteredTransactions = storedTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
  
        const matchesSearchTerm = (
          transaction.transaction.toLowerCase().includes(searchTerm) || 
          transaction.amount.toString().toLowerCase().includes(searchTerm) || 
          transaction.tag.toLowerCase().includes(searchTerm) || 
          transaction.account.toLowerCase().includes(searchTerm) || 
          transaction.status.toLowerCase().includes(searchTerm)
        );
  
        const matchesDateRange = (
          (!startDate || transactionDate >= startDate) && 
          (!endDate || transactionDate <= endDate)
        );
  
        return matchesSearchTerm && matchesDateRange;
      });
  
      updateTransactionTable(filteredTransactions);
    }
  
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
  
      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", handleEditTransaction);
      });
  
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleDeleteTransaction);
      });
    }
  
    function handleEditTransaction(event) {
      // Handle edit transaction
    }
  
    function handleDeleteTransaction(event) {
      // Handle delete transaction
    }
  });
  