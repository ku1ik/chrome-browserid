function sendToBackground(message) {
  chrome.extension.sendMessage(message, function(response) {});
}

function sendToAgent(message) {
  event = document.createEvent('CustomEvent');
  event.initCustomEvent('browserid-exec', true, true, message);
  window.dispatchEvent(event);
}

function onMessageFromAgent(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  console.log('message received in content from agent');
  console.log(event.data);

  sendToBackground(event.data);
}

function onMessageFromBackground(request, sender, sendResponse) {
  console.log('message received in content from background');
  console.log(request);
  sendToAgent(request);
  sendResponse({});
}

window.addEventListener("message", onMessageFromAgent, false);
chrome.extension.onMessage.addListener(onMessageFromBackground);

var si = new ScriptInjector(document);
var url = chrome.extension.getURL('js/agent.js') + ("?" + (new Date().getTime()));
si.injectScript(url);
