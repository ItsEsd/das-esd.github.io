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

// Callback function must be global
function inrd(e) {
  if (e.records != "") {
    var elem = document.createElement("div");
    var elem2 = document.getElementById("fetchpsty");
    elem.id = "mynote";
    elem.innerHTML =
      '<div id="opnote">' +
      e.record1 +
      '</div><div id="clsmynt" onclick="showntbtn(this);">CLOSE</div>';
    document.getElementById("about").appendChild(elem);
    document.getElementById("mvntartcon").classList.remove("loading-spin");

    // Only set this after removing the spinner
    elem2.innerHTML = e.record2;
  }
}

$(document).ready(function loadartpst() {
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
      "<p style='padding:40px;'>Loading ..</p>";
  });
});

const scrollContainer = document.getElementById("qutpost");
const arthead = document.getElementById("arthead");

let lastScrollTop = scrollContainer.scrollTop;

scrollContainer.addEventListener("scroll", function () {
  const currentScroll = scrollContainer.scrollTop;

  // Scrolling down
  if (currentScroll > lastScrollTop) {
    arthead.style.display = "none";
  }
  // Scrolling up by 100px or more
  else if (lastScrollTop - currentScroll > 100 || currentScroll <= 0) {
    arthead.style.display = "block";
  }

  lastScrollTop = currentScroll;
});
