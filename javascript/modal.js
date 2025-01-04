document.addEventListener("DOMContentLoaded", () => {
    const addDataBtn = document.getElementById("add-data-btn");
    const modal = document.getElementById("data-modal");
    const closeBtn = modal.querySelector(".close-btn");
    const form = document.getElementById("transaction-form");
  
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
  
      const transactionData = {
        date: form.date.value,
        transaction: form.transaction.value,
        amount: form.amount.value,
        tag: form.tag.value,
        account: form.account.value,
        status: form.status.value,
      };
  
      const table = document.querySelector(".transactions-table tbody");
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${transactionData.date}</td>
        <td>${transactionData.transaction}</td>
        <td>$${transactionData.amount}</td>
        <td>${transactionData.tag}</td>
        <td>${transactionData.account}</td>
        <td class="status-${transactionData.status}">${transactionData.status.charAt(0).toUpperCase() + transactionData.status.slice(1)}</td>
      `;
  
      table.appendChild(row);
  
      form.reset();
      modal.style.display = "none";
    });
  });
  