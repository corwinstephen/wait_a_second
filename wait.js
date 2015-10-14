var queue = {};
var DEFAULT_IDENTIFIER = 'DEFAULT_IDENTIFIER';
var DEFAULT_SETTINGS = {
  delayTime: 500,
  runImmediately: false,
  identifier: DEFAULT_IDENTIFIER
};

function delay(fn, opts){
  function setEmptyTimeout(){
    queue[settings.identifier] = setTimeout(function(){
      reset();
    }, settings.delayTime); 
  }

  function reset(){
    queue[settings.identifier] = null;
  }
  
  var settings = _.extend(DEFAULT_SETTINGS, opts);

  // If we've never invoked this before
  if(!queue[settings.identifier]){
    if(settings.runImmediately){
      setEmptyTimeout(); // So we don't try to do anything until at least delayTime later
      fn();
      return;
    }
  }
  // We've already called this at least once before
  else {
    clearTimeout(queue[settings.identifier]);
  }

  var timeout = setTimeout(function(){
    fn();
    reset();
  }, settings.delayTime);
  queue[settings.identifier] = timeout;
}