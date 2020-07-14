var ReadyFired = false;
var ReadyList = [];
var ReadyEventHandlersInstalled = false;

export function on(cb,ctx = document){
  if ( typeof callback !== "function" ) {
    throw new TypeError("callback for Ready(fn) must be a function");
  }

  if ( ReadyFired ) { // execute function
    setTimeout(function() {cb(ctx);}, 1);
    return;
  } else { // schedule for document ready
    ReadyList.push({func: cb, ctx: ctx});
  }

  if( document.readyState === "complete" ){
    setTimeout(ready_run,1);
  }
  else if ( !ReadyEventHandlersInstalled ) { // add handler if missing
    if ( document.addEventListener ) {
      document.addEventListener("DOMContentLoaded", ready_run, false);
      window.addEventListener("load", ready_run, false);
    } else {
      document.attachEvent("onreadystatechange", readyStateChange);
      window.attachEvent("onload", ready_run);
    }
    ReadyEventHandlersInstalled = true;
  }
};

function readyStateChange() {
  if ( document.readyState === "complete" ) {
    ready_run();
  }
};

function ready_run () {
  if (!ReadyFired) {
    ReadyFired = true;

    // loop list
    for (var i = 0; i < ReadyList.length; i++) {
      ReadyList[i].func.call(window, ReadyList[i].ctx); //execute
    }
    ReadyList = []; // clear
  }
};
