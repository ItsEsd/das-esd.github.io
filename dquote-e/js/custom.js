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
    allRecords = e.record2.split(/<hr\s*\/?>/i).filter((r) => r.trim() !== "");
    displayCount = 0;
    const container = document.getElementById("fetchpsty");
    container.innerHTML = "";
    container.innerHTML = "<base target='_blank'>";
    const oldBtn = document.getElementById("loadMoreBtn");
    if (oldBtn) oldBtn.remove();
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.id = "loadMoreBtn";
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.style.display = "none";
    loadMoreBtn.addEventListener("click", showNextRecords);
    container.after(loadMoreBtn);
    showNextRecords();
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
    loadartpst(); // re-run fetch
    $("#fetchpsty").empty(); // clear content
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
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      z-index: 10000;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    document.body.appendChild(overlay);
  }

  // Set image src
  document.getElementById("fullscreenImage").src = src;
}
