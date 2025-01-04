//transactions.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transaction-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = parseFloat(form.amount.value);
        if (isNaN(amount)) {
            alert("Please enter a valid number for the amount.");
            return;
        }

        const type = form.type.value;
        const transactionData = {
            id: Date.now(), 
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

        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateTransactionTable(transactions);
        updateFinancialSummary(transactions);

        form.reset();
        document.getElementById("data-modal").style.display = "none";
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
        const form = document.getElementById("transaction-form");
        form.date.value = transactionToEdit.date;
        form.transaction.value = transactionToEdit.transaction;
        form.amount.value = transactionToEdit.amount;
        form.tag.value = transactionToEdit.tag;
        form.account.value = transactionToEdit.account;
        form.status.value = transactionToEdit.status;
        form.type.value = transactionToEdit.type;

        transactions = transactions.filter((t) => t.id !== transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateTransactionTable(transactions);

        document.getElementById("data-modal").style.display = "block";
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
        }
    });

    let savings = netIncome - totalExpenses;

    document.getElementById("net-income").querySelector("h4").textContent = `$${netIncome.toFixed(2)}`;
    document.getElementById("total-expenses").querySelector("h4").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("savings").querySelector("h4").textContent = `$${savings.toFixed(2)}`;
}
