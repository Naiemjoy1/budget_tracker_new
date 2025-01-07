document.addEventListener("DOMContentLoaded", () => {
    const showContent = (id) => {
      const allContent = document.querySelectorAll(".tab-content");
      allContent.forEach((content) => {
        content.style.display = content.id === id ? "block" : "none";
      });
    };
    const tabs = document.querySelectorAll(".sidebar ul li, .main-left ul li");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.textContent.trim().toLowerCase();
        showContent(tabName); 
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active"); 
      });
    });
  });
  