//chart.js
document.addEventListener("DOMContentLoaded", () => {
  const chartCategorySelect = document.getElementById("budget-category");
  const chartCanvas = document.getElementById("expense-chart");
  const chartButtons = document.querySelectorAll(".chart-top-right button");

  let expenseChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: [], 
      datasets: [
        {
          label: "Income",
          data: [],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Expenses",
          data: [],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Savings",
          data: [],
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Investments",
          data: [],
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Debt",
          data: [],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
          ticks: {
            maxRotation: 90,
            minRotation: 45,
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount ($)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
    },
  });

  chartCategorySelect.addEventListener("change", (e) => {
    updateChart(e.target.value);
  });

  chartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateChart(chartCategorySelect.value);
    });
  });

  function updateChart(category) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const dailyData = calculateDailyDataForMonth(transactions, category);
    renderChart(dailyData, category);
  }

  function calculateDailyDataForMonth(transactions, category) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

    let incomeData = Array(daysInMonth).fill(0);
    let expenseData = Array(daysInMonth).fill(0);
    let savingsData = Array(daysInMonth).fill(0);
    let investmentData = Array(daysInMonth).fill(0);
    let debtData = Array(daysInMonth).fill(0);

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth
      ) {
        const dayIndex = date.getDate() - 1;
    
        if (transaction.type === "income") {
          incomeData[dayIndex] += parseFloat(transaction.amount);
        }
    
        if (transaction.type === "expense") {
          expenseData[dayIndex] += parseFloat(transaction.amount);
        }
    
        if (transaction.type === "income" || transaction.type === "expense") {
          savingsData[dayIndex] += parseFloat(transaction.amount);
        }
    
        if (
          transaction.tag &&
          transaction.tag.toLowerCase().includes("investment")
        ) {
          investmentData[dayIndex] += parseFloat(transaction.amount);
        }
    
        if (
          transaction.tag &&
          transaction.tag.toLowerCase().includes("debt")
        ) {
          debtData[dayIndex] += parseFloat(transaction.amount);
        }
      }
    });
    

    return {
      labels,
      incomeData,
      expenseData,
      savingsData,
      investmentData,
      debtData,
    };
  }

  function renderChart(dailyData, category) {
    expenseChart.data.labels = dailyData.labels;

    const allData = [
      dailyData.incomeData,
      dailyData.expenseData,
      dailyData.savingsData,
      dailyData.investmentData,
      dailyData.debtData,
    ];

    expenseChart.data.datasets.forEach((dataset, index) => {
      if (category === "all" || dataset.label.toLowerCase() === category) {
        dataset.data = allData[index];
        dataset.hidden = false;
      } else {
        dataset.hidden = true;
      }
    });

    expenseChart.update();
  }

  updateChart("all");
});
