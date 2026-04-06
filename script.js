// SIDEBAR FUNCTIONALITY
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

// UPDATE TIME FUNCTION FOR FOOTER
function updateTime() {
  const timeElements = document.querySelectorAll(".local-time");
  const now = new Date();

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;

  const timeString = `Local Time: ${displayHours}:${minutes}:${seconds} ${ampm}, PST`;

  timeElements.forEach((el) => (el.textContent = timeString));
}

updateTime();
setInterval(updateTime, 1000);

// MATCH THE TWO COLUMNS IN PROJECT VIEW
function matchImageHeight() {
  const description = document.querySelector(".project-description");
  const images = document.querySelector(".project-images");

  if (!description || !images) return;

  // ONLY APPLY ON 768 AND ABOVE
  if (window.innerWidth >= 768 && window.innerWidth <= 1440) {
    const descriptionHeight = description.getBoundingClientRect().height;
    images.style.maxHeight = descriptionHeight + "px";
    images.style.overflowY = "auto";
  } else {
    // RESET ON MOBILE
    images.style.maxHeight = "";
    images.style.overflowY = "";
  }
}

document.fonts.ready.then(() => {
  matchImageHeight();
  window.addEventListener("resize", matchImageHeight);
});
