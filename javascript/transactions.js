document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("add-transaction-form");
  const editForm = document.getElementById("edit-transaction-form");
  const addDataModal = document.getElementById("add-data-modal");
  const editDataModal = document.getElementById("edit-data-modal");
  let editingTransactionId = null;  
  let currentBalance = 0;  
  
  const addDataBtn = document.getElementById("add-data-btn");
  addDataBtn.addEventListener("click", () => {
    addDataModal.style.display = "flex";
  });

  window.addEventListener("click", (e) => {
    if (e.target === addDataModal) {
      addDataModal.style.display = "none";
    }
    if (e.target === editDataModal) {
      editDataModal.style.display = "none";
    }
  });

  document.querySelectorAll(".close-btn").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      addDataModal.style.display = "none";
      editDataModal.style.display = "none";
    });
  });

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(addForm.amount.value);
    if (isNaN(amount)) {
      alert("Please enter a valid number for the amount.");
      return;
    }

    const transactionData = {
      id: Date.now(),
      date: addForm.date.value,
      transaction: addForm.transaction.value,
      amount: amount,
      tag: addForm.tag.value,
      account: addForm.account.value,
      status: addForm.status.value,
      type: addForm.type.value,
    };

    if (transactionData.type === "income") {
      currentBalance += amount;
    } else if (transactionData.type === "expense") {
      currentBalance -= amount;
    } else if (transactionData.type === "debt") {
      currentBalance += amount; 
    } else if (transactionData.type === "investment") {
      currentBalance -= amount;  
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.unshift(transactionData);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionTable(transactions);
    updateFinancialSummary(transactions);

    addForm.reset();
    addDataModal.style.display = "none";  
  });

  
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", handleEditTransaction);
  });

  
  const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  updateTransactionTable(storedTransactions);
  updateFinancialSummary(storedTransactions);

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(editForm["edit-amount"].value);
    if (isNaN(amount)) {
      alert("Please enter a valid number for the amount.");
      return;
    }

    const updatedTransactionData = {
      id: editingTransactionId,
      date: editForm["edit-date"].value,
      transaction: editForm["edit-transaction"].value,
      amount: amount,
      tag: editForm["edit-tag"].value,
      account: editForm["edit-account"].value,
      status: editForm["edit-status"].value,
      type: editForm["edit-type"].value,
    };

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.map((transaction) =>
      transaction.id === editingTransactionId ? updatedTransactionData : transaction
    );

    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionTable(transactions);
    updateFinancialSummary(transactions);

    editForm.reset();
    editDataModal.style.display = "none";
    editingTransactionId = null;
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
    const transactionId = parseInt(event.target.dataset.id);
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const transactionToEdit = transactions.find((t) => t.id === transactionId);

    if (transactionToEdit) {
      editForm["edit-date"].value = transactionToEdit.date;
      editForm["edit-transaction"].value = transactionToEdit.transaction;
      editForm["edit-amount"].value = transactionToEdit.amount;
      editForm["edit-tag"].value = transactionToEdit.tag;
      editForm["edit-account"].value = transactionToEdit.account;
      editForm["edit-status"].value = transactionToEdit.status;
      editForm["edit-type"].value = transactionToEdit.type;

      editingTransactionId = transactionId;  
      editDataModal.style.display = "flex";   
    }
  }

  function handleDeleteTransaction(event) {
    const transactionId = parseInt(event.target.dataset.id);
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.filter((t) => t.id !== transactionId);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionTable(transactions);
    updateFinancialSummary(transactions);
  }

 
  function updateFinancialSummary(transactions) {
    let netIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        netIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      } else if (transaction.type === "debt") {
        netIncome += transaction.amount;  
      } else if (transaction.type === "investment") {
        totalExpenses += transaction.amount;  
      }
    });

    let savings = netIncome - totalExpenses;

    document.getElementById("net-income").querySelector("h4").textContent = `$${netIncome.toFixed(2)}`;
    document.getElementById("total-expenses").querySelector("h4").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("savings").querySelector("h4").textContent = `$${savings.toFixed(2)}`;
  }

  const clearButton = document.querySelector(".date-range button");

  clearButton.addEventListener("click", () => {
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    updateTransactionTable(transactions);
    updateFinancialSummary(transactions);
  });
});
