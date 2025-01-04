const chartButtons = document.querySelectorAll(".chart-top-right button");
const categoryDropdown = document.getElementById("budget-category");

chartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    chartButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to the clicked button
    button.classList.add("active");

    // Fetch the data for the selected period (you can integrate chart updates here)
    console.log(`Selected Period: ${button.dataset.period}`);
  });
});

categoryDropdown.addEventListener("change", () => {
  const selectedCategory = categoryDropdown.value;
  // Fetch data for the selected category (you can integrate chart updates here)
  console.log(`Selected Category: ${selectedCategory}`);
});
