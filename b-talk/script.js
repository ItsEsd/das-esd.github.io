const toggleMenu = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const content = document.querySelector(".content");
const bars = document.querySelectorAll(".bar");
const menuItems = document.querySelectorAll(".menu-items .item");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("resize");
  content.classList.toggle("resize");
  toggleMenu.classList.toggle("active");

  bars.forEach((bar) => {
    bar.classList.add("anim-bar");
    setTimeout(() => {
      bar.classList.remove("anim-bar");
    }, 1000);
  });
});
setTimeout(() => {
  sideMenu.classList.add("resize");
  content.classList.add("resize");
  toggleMenu.classList.add("active");
  bar.classList.add("anim-bar");
}, 1000);

menuItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    menuItems.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.getElementById(hash.substring(1));
    const matchingMenuItem = document.querySelector(
      `.menu-items a[href="${hash}"]`
    );

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    if (matchingMenuItem) {
      menuItems.forEach((item) => item.classList.remove("active"));
      matchingMenuItem.classList.add("active");
    }
  }
});

// Create the fullscreen overlay container
const fullscreenDiv = document.createElement("div");
fullscreenDiv.style.position = "fixed";
fullscreenDiv.style.top = "0";
fullscreenDiv.style.left = "0";
fullscreenDiv.style.width = "100vw";
fullscreenDiv.style.height = "100vh";
fullscreenDiv.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
fullscreenDiv.style.display = "none";
fullscreenDiv.style.justifyContent = "center";
fullscreenDiv.style.alignItems = "center";
fullscreenDiv.style.zIndex = "1000";
fullscreenDiv.id = "fullscreenImageDiv";
fullscreenDiv.zIndex = "inherit";

// Create the fullscreen image
const fullImage = document.createElement("img");
fullImage.style.maxWidth = "90vw";
fullImage.style.maxHeight = "90vh";
fullscreenDiv.appendChild(fullImage);

// Create the close button
const closeBtn = document.createElement("button");
closeBtn.textContent = "✖";
closeBtn.style.position = "absolute";
closeBtn.style.top = "20px";
closeBtn.style.right = "30px";
closeBtn.style.fontSize = "20px";
closeBtn.style.padding = "10px 20px";
closeBtn.style.backgroundColor = "#fff";
closeBtn.style.border = "none";
closeBtn.style.cursor = "pointer";
closeBtn.style.borderRadius = "5px";
fullscreenDiv.appendChild(closeBtn);

// Close event
closeBtn.addEventListener("click", () => {
  fullscreenDiv.style.display = "none";
  fullImage.src = "";
});

// Add fullscreen div to body
document.body.appendChild(fullscreenDiv);

// Add click listeners to all images
document.querySelectorAll("img").forEach((img) => {
  img.style.cursor = "zoom-in"; // Optional: visual cue
  img.addEventListener("click", () => {
    fullImage.src = img.src;
    fullscreenDiv.style.display = "flex";
  });
});
