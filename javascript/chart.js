document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("expense-chart").getContext("2d");
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Expenses",
          data: [1200, 1300, 1500, 1000, 1700, 1200, 1900, 0, 0, 0, 0, 0],
          fill: false,
          borderColor: "#7578d3",
          tension: 0.1,
        },
      ],
    };
  
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height/width
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
            },
          },
          y: {
            title: {
              display: true,
              text: "Expense ($)",
            },
          },
        },
      },
    };
  
    // Set canvas height explicitly
    const canvasElement = document.getElementById("expense-chart");
    canvasElement.height = 300;
  
    new Chart(ctx, config);
  });
  