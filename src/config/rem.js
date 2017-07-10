(function(win) {
  var doc = win.document;
  var docEl = doc.documentElement;
  resizeFn ();
  window.onresize = function(){
    resizeFn ();
  };
  function resizeFn (){
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
  };
})(window);
