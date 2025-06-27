(function ($) {
  "use strict";

  // Parallax Js
  function initParallax() {
    $("#home").parallax("100%", 0.3);
    $("#about").parallax("20%", 0.3);
    $("#work").parallax("40%", 0.3);
    $("#contact").parallax("60%", 0.3);
    $("#footer").parallax("80%", 0.3);
  }
  initParallax();

  // WOW Animation js
  new WOW({ mobile: false }).init();

  document
    .getElementById("openModalBtn")
    .addEventListener("click", function () {
      $("#mypost").show();
      document.body.style.overflow = "hidden";
    });

  document
    .getElementsByClassName("closepst")[0]
    .addEventListener("click", function () {
      document.getElementById("mypost").style.display = "none";
      document.body.style.overflowY = "auto";
    });
  window.addEventListener("click", function (event) {
    var modal = document.getElementById("mypost");
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflowY = "auto";
    }
  });
})(jQuery);

let allRecords = [];
let displayCount = 0;
const increment = 10;

function inrd(e) {
  if (e.record2 && e.record2.trim() !== "") {
    document.getElementById("mvntartcon").classList.remove("loading-spin");

    // Convert <img src="..."> → <img data-src="...">
    const sanitizedRecords = e.record2
      .split(/<hr\s*\/?>/i)
      .filter((r) => r.trim() !== "")
      .map((html) =>
        html
          .replace(
            /<img\s+([^>]*?)src=["']([^"']+)["']/gi,
            '<img $1data-src="$2" class="lazy-img"'
          )
          // Optional: force links to open in new tab
          .replace(/<a\s+([^>]*?)>/gi, '<a $1 target="_blank">')
      );

    allRecords = sanitizedRecords;
    displayCount = 0;

    const container = document.getElementById("fetchpsty");
    container.innerHTML = ""; // ✅ Reset content

    const oldBtn = document.getElementById("loadMoreBtn");
    if (oldBtn) oldBtn.remove();

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.id = "loadMoreBtn";
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.style.display = "none";
    loadMoreBtn.addEventListener("click", showNextRecords);
    container.after(loadMoreBtn);

    showNextRecords();
    observeLazyImages();
  }
}

function showNextRecords() {
  const container = document.getElementById("fetchpsty");
  const end = Math.min(displayCount + increment, allRecords.length);
  for (let i = displayCount; i < end; i++) {
    const div = document.createElement("div");
    div.innerHTML = allRecords[i].trim();
    container.appendChild(div);
    const hr = document.createElement("hr");
    container.appendChild(hr);
  }
  displayCount = end;
  const btn = document.getElementById("loadMoreBtn");
  btn.style.display = displayCount < allRecords.length ? "block" : "none";
  observeLazyImages();
}

$(document).ready(function loadartpst() {
  document.getElementById("fetchpsty").innerHTML =
    "<div style='display:flex;justify-content:center;align-items:center;height:80vh;'><p>Loading ..</p></div>";
  document.getElementById("mvntartcon").classList.add("loading-spin");
  var ur1 = "https://script.google.com/macros/s/";
  var ur2 =
    "AKfycbxc6Ljdrah_Y32syw7bILdTQoevZ39VpGfNztpq1l18JN_d4njnTWcw3nQne99TN_6cKw";
  var url = ur1 + ur2 + "/exec?callback=inrd&rdin=dascl&action=in";
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });

  $(".rfrshpst").click(function () {
    const oldBtn = document.getElementById("loadMoreBtn");
    if (oldBtn) oldBtn.remove();
    loadartpst();
    $("#fetchpsty").empty();
    document.getElementById("fetchpsty").innerHTML =
      "<div style='display:flex;justify-content:center;align-items:center;height:80vh;'><p>Loading ..</p></div>";
  });
});

const scrollContainer = document.getElementById("qutpost");
const arthead = document.getElementById("arthead");
let lastScrollTop = scrollContainer.scrollTop;
scrollContainer.addEventListener("scroll", function () {
  const currentScroll = scrollContainer.scrollTop;
  if (currentScroll > lastScrollTop) {
    arthead.style.transform = "translateY(-100%)";
  } else if (lastScrollTop - currentScroll > 40 || currentScroll <= 0) {
    arthead.style.transform = "translateY(0)";
  }
  lastScrollTop = currentScroll;
});

document.addEventListener("click", function (e) {
  const target = e.target;
  if (
    target.tagName === "IMG" &&
    document.getElementById("fetchpsty").contains(target) &&
    !target.closest("a")
  ) {
    showFullscreenImage(target.src);
  }
});

function showFullscreenImage(src) {
  let overlay = document.getElementById("fullscreenOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "fullscreenOverlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999999;
      flex-direction: column;
    `;

    // Fullscreen image
    const img = document.createElement("img");
    img.id = "fullscreenImage";
    img.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `;
    overlay.appendChild(img);

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 30px;
      background:rgba(0, 0, 0, 0.67);
      border: none;
      color:rgba(255, 255, 255, 0.87);
      cursor: pointer;
      z-index: 10000;
      height:50px;
      width:50px;
      border-radius:50%;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    document.body.appendChild(overlay);
  }

  // Set image src
  document.getElementById("fullscreenImage").src = src;
}

function observeLazyImages() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add("loaded"); // trigger fade-in
          obs.unobserve(img);
        }
      });
    },
    {
      rootMargin: "200px 0px", // preload a bit before visible
      threshold: 0.1,
    }
  );

  document.querySelectorAll("img.lazy-img:not([src])").forEach((img) => {
    observer.observe(img);
  });
}

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  // Create toolbar once
  const toolbar = document.createElement("div");
  toolbar.className = "image-toolbar";
  document.body.appendChild(toolbar);

  // Actions
  const menuOptions = [
    {
      label: "Open Image in New Tab",
      action: (img) => window.open(img.src, "_blank"),
    },
    {
      label: "Copy Image",
      action: async (img) => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          if (!blob) throw new Error("Could not convert image");
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          alert("Image copied to clipboard");
        } catch (err) {
          alert("Copy image failed: " + err.message);
        }
      },
    },
    {
      label: "Copy Image Address",
      action: (img) => {
        navigator.clipboard.writeText(img.src);
        alert("Image address copied");
      },
    },
    {
      label: "Share",
      action: (img) => {
        if (navigator.share) {
          navigator
            .share({
              title: "Shared Image",
              url: img.src,
            })
            .catch((err) => console.log("Share failed:", err));
        } else {
          alert("Web Share API not supported.");
        }
      },
    },
  ];

  // Create buttons inside toolbar
  menuOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      if (toolbar.relatedImage) {
        opt.action(toolbar.relatedImage);
        toolbar.style.display = "none";
      }
    });
    toolbar.appendChild(btn);
  });

  // Add dismiss button
  const dismissBtn = document.createElement("button");
  dismissBtn.className = "dismsimgop";
  dismissBtn.textContent = "×";
  dismissBtn.title = "Close menu";

  dismissBtn.addEventListener("click", () => {
    toolbar.style.display = "none";
  });
  toolbar.appendChild(dismissBtn);

  // Show toolbar when any image is clicked
  document.addEventListener("click", (e) => {
    toolbar.style.display = "none";

    if (e.target.tagName === "IMG") {
      const img = e.target;
      const clickX = e.clientX;
      const clickY = e.clientY;
      const menuWidth = 180;
      const menuHeight = menuOptions.length * 36;

      const maxLeft = window.innerWidth - menuWidth - 10;
      const maxTop = window.innerHeight - menuHeight - 10;

      const left = Math.min(clickX, maxLeft);
      const top = Math.min(clickY, maxTop);

      toolbar.style.display = "flex";
      toolbar.style.top = `${window.scrollY + top}px`;
      toolbar.style.left = `${window.scrollX + left}px`;
      toolbar.relatedImage = img;

      e.stopPropagation();
    }
  });

  document.addEventListener("click", (e) => {
    if (!toolbar.contains(e.target) && e.target.tagName !== "IMG") {
      toolbar.style.display = "none";
    }
  });

  // Hide toolbar if clicking outside
  document.addEventListener("scroll", () => {
    toolbar.style.display = "none";
  });
});
