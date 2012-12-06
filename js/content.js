if (document.readyState == "complete") {
  check();
} else {
  window.onload = check;
}

function check() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "browserid-check";
  script.innerHTML = "if (navigator.id) document.getElementById('browserid-check').setAttribute('supported', 'true')";
  document.head.appendChild(script);

  script = document.getElementById('browserid-check');
  if (script.getAttribute('supported') == 'true') {
    chrome.extension.sendRequest({}, function(response) {});
  }
}
