function ScriptInjector(document) {
  this.document = document;
}

ScriptInjector.prototype.injectScript = function(code, id) {
  var script, src;

  if (typeof code == 'function') {
    code = '(' + code.toString() + ')()';
  } else if (typeof code == 'string') {
    if (code.match(/^([a-z-]+:\/\/|\/)/)) {
      src = code;
      code = '';
    }
  }

  if (id && (script = this.document.getElementById(id))) {
    script.innerHTML = code;
  } else {
    script = this.document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = code;
    if (id) script.id = id;
    if (src) script.src = src;
    this.document.head.appendChild(script);
  }
};
