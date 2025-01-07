// button.js
const chartButtons = document.querySelectorAll(".chart-top-right button");
const categoryDropdown = document.getElementById("budget-category");

chartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chartButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    console.log(`Selected Period: ${button.dataset.period}`);
  });
});

categoryDropdown.addEventListener("change", () => {
  const selectedCategory = categoryDropdown.value;
  console.log(`Selected Category: ${selectedCategory}`);
});
