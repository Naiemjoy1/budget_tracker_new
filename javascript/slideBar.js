//slidebar
const hamburgerIcon = document.getElementById("hamburger-icon");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.querySelector(".close-sidebar");

hamburgerIcon.addEventListener("click", () => {
    sidebar.classList.add("show");
});

closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("show");
});

window.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        sidebar.classList.remove("show");
    }
});
