// modal.js
document.addEventListener("DOMContentLoaded", () => {
  const addDataBtn = document.getElementById("add-data-btn");
  const modal = document.getElementById("data-modal");
  const closeBtn = modal.querySelector(".close-btn");

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
});
