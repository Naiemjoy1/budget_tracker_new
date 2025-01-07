// Function to export transactions to CSV
function exportTransactionsToCSV() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
    if (transactions.length === 0) {
      alert("No transaction data available to export.");
      return;
    }
  
    const header = ["Date", "Transaction", "Amount", "Tag", "Account", "Status"];
    
    const rows = transactions.map((transaction) => {
      return [
        transaction.date,               
        transaction.transaction,         
        transaction.amount,              
        transaction.tag,                 
        transaction.account,             
        transaction.status               
      ].join(","); 
    });
  
    const csvContent = [header.join(",")].concat(rows).join("\n");
  
    downloadCSV(csvContent);
  }
  
  function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
  
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "transactions.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("CSV export is not supported in your browser.");
    }
  }
  
  document.getElementById("export-csv-btn").addEventListener("click", exportTransactionsToCSV);
  