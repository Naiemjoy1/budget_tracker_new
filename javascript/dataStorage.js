// dataStorage.js
function storeTransactionData(transactionData) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.unshift(transactionData);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  
  function getTransactionData() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  }
  
  function updateTransactionData(updatedTransactionData) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.map((transaction) =>
      transaction.id === updatedTransactionData.id ? updatedTransactionData : transaction
    );
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  
  function deleteTransactionData(transactionId) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.filter((t) => t.id !== transactionId);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  