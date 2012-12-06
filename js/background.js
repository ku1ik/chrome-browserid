var loggedIn = false;

function onMessage(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.

  console.log('message received in background');
  console.log(request);

  if (request.type == 'icon') {
    if (request.show) {
      chrome.pageAction.show(sender.tab.id);
    } else {
      chrome.pageAction.hide(sender.tab.id);
    }
  } else if (request.type == 'auth') {
    var path, title;

    if (request.loggedIn) {
      path = 'images/persona-logged-in.png';
      title = 'Logged in with Mozilla Persona - click to log out';
    } else {
      path = 'images/persona-logged-out.png';
      title = 'Click to log in with Mozilla Persona';
    }

    loggedIn = request.loggedIn;

    chrome.pageAction.setIcon({
      tabId: sender.tab.id,
      path: path
    });

    chrome.pageAction.setTitle({
      tabId: sender.tab.id,
      title: title
    });
  }

  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

function sendToContent(tab, message) {
  chrome.tabs.sendMessage(tab.id, message);
}

function onClicked(tab) {
  if (loggedIn) {
    sendToContent(tab, { type: 'request-logout' });
  } else {
    sendToContent(tab, { type: 'request-login' });
  }
}

chrome.extension.onMessage.addListener(onMessage);
chrome.pageAction.onClicked.addListener(onClicked);
