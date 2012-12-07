(function() {
  // wait for polyfill to be loaded
  if (document.readyState == "complete") {
    init();
  } else {
    window.addEventListener('load', init);
  }

  var loggedIn = false;

  function init() {
    // just quit if no navigator observer API available
    if (!navigator.id || !navigator.id.watch)
      return;

    sendToContent({ type: "init" });
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
    console.log('message received in page');
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
