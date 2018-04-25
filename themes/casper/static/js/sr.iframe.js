Paperli = window.Paperli || {};

Paperli.FRAME_NUMBER = Paperli.FRAME_NUMBER || 0;

Paperli.PaperFrame = function() { // hide the namespace
  var interval_id, last_hash, cache_bust = 1, attached_callback, window = this;
  
  function offset(obj) {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      }
      while (obj = obj.offsetParent);
    }
    return {left: curleft, top: curtop};
  };

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };  

  return {
    Show: function(options) {
      var if_height,
      protocol = options.protocol || window.location.protocol,
      domain = options.domain || 'paper.li',
      base_url = protocol + '//' + domain,
      id = 'sr-paper-frame-' + (++Paperli.FRAME_NUMBER),
      // default parameters
      params = ['ifrm=true', 'loc=' + encodeURIComponent(document.location.href)];
      // optional parameter
      if (options.lang)
        params.push('lang=' + options.lang);
      // optional paper parameters
      if (options.pid) {
        if (options.sid)
          params.push('share_id=' + options.sid);
        if (options.unsubscribe)
          params.push('unsubscribe=' + options.unsubscribe);
      }
      
      var iframe_src = src = base_url + (options.pid ? '/~/papers/' + options.pid : '') + '?' + params.join('&');
      
      // wire GA if turned on and present
      if (options.ga && typeof(_gaq) != 'undefined') {
        _gaq.push(function(){
          var pageTracker = _gat._getTrackerByName();
          var iframe = document.getElementById(id);
          iframe.src = pageTracker._getLinkerUrl(src);
        });
        // to render frame with empty content, the correct one will be initialized on above GA callback
        iframe_src = 'about:blank';
      }

      document.write('<iframe id="' + id + '" src="' + iframe_src + '" width="100%" height="1000" scrolling="yes" frameBorder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" style="width:1px;min-width:100%;*width:100%;height:100vh;"></iframe>');
      
      // setup a callback to handle the dispatched MessageEvent. if window.postMessage is supported the passed
      // event will have .data, .origin and .source properties. otherwise, it will only have the .data property.
      Paperli.PaperFrame.ReceiveMessage(function(message){
        var data = message && message.data;

        if (data && typeof data == 'string' && data.indexOf('if_height') != -1) {
          var payload = JSON.parse(data);
          // new post message structure
          if (payload.type == 'paper_iframe') {
            payload = payload.data;
          }

          // Get the height from the passsed data.
          var h = payload.if_height;
          var scroll = payload.scroll;
          var frame = document.getElementById(id);
            
          if (!isNaN(h) && h >= 0 && h !== if_height) {
            // Height has changed, update the iframe.
            frame.height = if_height = h;
          }
          if (scroll && scroll == 'top') {
            var position = offset(frame);
            window.scrollTo(0, position.top);
          }
        }
      }, base_url);
      
      // register scroll listener so we post pageY offset and window's inner height
      window.onload = window.onscroll = debounce(function(e) {
        var frame = document.getElementById(id),
        pageY = window.pageYOffset,
        innerHeight = window.innerHeight - (options.padding_bottom || 0),
        position = offset(frame);
        
        if (frame.src != 'about:blank') {
          var data = {
            if_pageY: pageY,
            if_innerHeight: innerHeight,
            if_offsetTop: position.top
          };
          
          Paperli.PaperFrame.PostMessage(JSON.stringify(data), src, frame.contentWindow);
          Paperli.PaperFrame.PostMessage(JSON.stringify({data: data, type: 'paper_iframe'}), src, frame.contentWindow); // new post message structure
        }
      }, 1000);
    },
    
    PostMessage: function(message, target_url, target) {
      if (!target_url) {
        return;
      }
      target = target || parent; // default to parent
      if (window['postMessage']) {
        // the browser supports window.postMessage, so call it with a targetOrigin
        // set appropriately, based on the target_url parameter.
        target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
      }
      else 
        if (target_url) {
          // the browser does not support window.postMessage, so use the window.location.hash fragment hack
          target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
        }
    },
    
    ReceiveMessage: function(callback, source_origin) {
      // browser supports window.postMessage
      if (window['postMessage']) {
        // bind the callback to the actual event associated with window.postMessage
        if (callback) {
          attached_callback = function(e) {
            if ((typeof source_origin === 'string' && e.origin !== source_origin) ||
            (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
              return !1;
            }
            callback(e);
          };
        }
        if (window['addEventListener']) {
          window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
        }
        else {
          window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
        }
      }
      else {
        // a polling loop is started & callback is called whenever the location.hash changes
        interval_id && clearInterval(interval_id);
        interval_id = null;
        if (callback) {
          interval_id = setInterval(function() {
            var hash = document.location.hash, re = /^#?\d+&/;
            if (hash !== last_hash && re.test(hash)) {
              last_hash = hash;
              callback({
                data: hash.replace(re, '')
              });
            }
          }, 100);
        }
      }
    }
  };
}();