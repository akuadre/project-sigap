const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  menuList.classList.toggle("hidden");
});

const icon = document.getElementById("icon");
const iconText = document.getElementById("icon-text");

icon.addEventListener("mouseover", function () {
  iconText.classList.add("show");
});

icon.addEventListener("mouseout", function () {
  iconText.classList.remove("show");
});
