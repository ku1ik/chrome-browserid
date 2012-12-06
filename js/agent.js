(function() {
  // wait for polyfill to be loaded
  if (document.readyState == "complete") {
    init();
  } else {
    window.onload = init;
  }

  var loggedIn = false;

  function init() {
    if (!navigator.id)
      return;

    sendToContent({ type: "icon", show: true });
    window.addEventListener('browserid-exec', onMessage);
    navigator.id.watch({ onlogin: onLogin, onlogout: onLogout });
  }

  function onLogin(assertion) {
    console.log('onLogin');
    loggedIn = true;
    sendToContent({ type: 'auth', loggedIn: loggedIn });
  }

  function onLogout() {
    console.log('onLogout');
    loggedIn = false;
    sendToContent({ type: 'auth', loggedIn: loggedIn });
  }

  function onMessage(event) {
    console.log('message received in agent');
    console.log(event.detail);

    var data = event.detail;

    if (data.type == 'request-login') {
      navigator.id.request();
    } else if (data.type == 'request-logout') {
      navigator.id.logout();
    }
  }

  function sendToContent(message) {
    window.postMessage(message, "*");
  }
})();
