// search.js
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");  
  
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
      const filteredTransactions = storedTransactions.filter(transaction => {
        return (
          transaction.transaction.toLowerCase().includes(searchTerm) ||
          transaction.tag.toLowerCase().includes(searchTerm)
        );
      });
  
      updateTransactionTable(filteredTransactions);
    });
  });
  