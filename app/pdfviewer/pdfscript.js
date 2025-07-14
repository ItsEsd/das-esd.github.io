document.addEventListener("DOMContentLoaded", function () {
  const url_string = window.location.href;
  const url = new URL(url_string);

  const fileParam = url.searchParams.get("d"); // PDF URL
  const titleParam = url.searchParams.get("a"); // PDF Name
  const showFlag = url.searchParams.get("s"); // Flag: true or false

  const tostr = url.searchParams.toString();
  const fullurl = tostr.split("%22");
  const chkfltyp = fullurl[1] ? fullurl[1].split(".pdf") : [];

  let f_url = "";
  let f_meta = titleParam || "PDF Document";

  if (showFlag === "true" && chkfltyp[1] === "") {
    // Valid PDF
    $("#crtpdflk,#formContainer").hide();
    const f_urlF = fullurl[1];
    f_url = unescape(f_urlF.replace(/\+/g, " "));
    document.title = `${f_meta} | D's World`;

    document.addEventListener("adobe_dc_view_sdk.ready", function () {
      const adobeDCView = new AdobeDC.View({
        clientId: "42a6ed502ff6469caecf4c3da1fecbff",
        divId: "adobe-dc-view",
      });
      adobeDCView.previewFile(
        {
          content: { location: { url: f_url } },
          metaData: { fileName: f_meta },
        },
        {}
      );
    });

    document.body.addEventListener("click", function () {
      window.open(f_url, "_blank");
    });
  } else if (showFlag === "true" && chkfltyp.length === 1) {
    // Likely a non-PDF file or fallback
    $("#crtpdflk,#formContainer").hide();
    $("#objcont").show();
    f_url = unescape(chkfltyp[0].replace(/\+/g, " "));
    document.getElementById(
      "objcont"
    ).innerHTML = `<object data="${f_url}" id="objfrm"></object>`;
    document.title = `${f_meta} | D's World`;
  }
});

function createForm() {
  $("#formContainer").empty();
  var form = document.createElement("form");

  var input1 = document.createElement("input");
  input1.type = "url";
  input1.name = "input1";
  input1.placeholder = "PDF File Link";
  input1.setAttribute("required", "required");
  form.appendChild(input1);

  var input2 = document.createElement("input");
  input2.type = "text";
  input2.name = "input2";
  input2.setAttribute("required", "required");
  input2.placeholder = "PDF Name";
  form.appendChild(input2);

  var submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.innerText = "Create Link";
  form.appendChild(submitBtn);

  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.innerText = "Close";
  form.appendChild(closeBtn);
  closeBtn.addEventListener("click", function () {
    $("#formContainer").empty();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value1 = escape('"' + input1.value + '"');
    var value2 = "&a=" + escape(input2.value);
    var value3 = "&s=true";
    var result =
      "https://soubhikdas.in/app/pdfviewer/?d=" + value1 + value2 + value3;
    var input3 = document.createElement("input");
    input3.type = "text";
    input3.id = "resltlk";
    input3.value = result;
    input3.style.width = "91%";
    form.appendChild(input3);
  });
  document.getElementById("formContainer").appendChild(form);
}

setInterval(function () {
  console.clear();
}, 500);
