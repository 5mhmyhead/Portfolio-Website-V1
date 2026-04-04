// sidebar functionality
const menuBtns = document.querySelectorAll(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    document.body.style.overflow = sidebar.classList.contains("open")
      ? "hidden"
      : "";
  });
});
