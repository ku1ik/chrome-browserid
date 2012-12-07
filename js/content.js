function sendToBackground(message) {
  chrome.extension.sendMessage(message, function(response) {});
}

function sendToPage(message) {
  event = document.createEvent('CustomEvent');
  event.initCustomEvent('browserid-exec', true, true, message);
  window.dispatchEvent(event);
}

function onMessageFromPage(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  console.log('message received in content from page');
  console.log(event.data);

  sendToBackground(event.data);
}

function onMessageFromBackground(request, sender, sendResponse) {
  console.log('message received in content from background');
  console.log(request);
  sendToPage(request);
  sendResponse({});
}

window.addEventListener("message", onMessageFromPage, false);
chrome.extension.onMessage.addListener(onMessageFromBackground);

// insert page.js into the real page
// (as opposed to "content script" one that doesn't have navigator.id injected)
var script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.extension.getURL('js/page.js') + ("?" + (new Date().getTime()));;
document.head.appendChild(script);
