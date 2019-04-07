/**
 * Utility methods
 */
(function(w){

  /**
   * Normalize requestAnimationFrame cross-browser
   *
   * @param {Function} callback - Function to call when it's time to update your animation for the next repaint.
   * @param {HTMLElement} element - Optional parameter specifying the element that visually bounds the entire animation.
   *
   * @return {Number} requestAnimationFrame
   */
  if (!w.requestAnimationFrame) {

    w.requestAnimationFrame = ( w.webkitRequestAnimationFrame ||
                                w.mozRequestAnimationFrame ||
                                w.oRequestAnimationFrame ||
                                w.msRequestAnimationFrame ||
                                function(callback) {
                                  return w.setTimeout(callback, 1000 / 60);
                                });

  }

  /**
   * Normalize cancelAnimationFrame cross-browser
   *
   * @param {Number} Animation frame request
   */
  if (!w.cancelAnimationFrame) {

    w.cancelAnimationFrame = ( w.cancelRequestAnimationFrame || 
                              w.webkitCancelAnimationFrame ||
                              w.webkitCancelRequestAnimationFrame ||
                              w.mozCancelAnimationFrame ||
                              w.mozCancelRequestAnimationFrame ||
                              w.oCancelAnimationFrame ||
                              w.oCancelRequestAnimationFrame ||
                              w.msCancelAnimationFrame ||
                              w.msCancelRequestAnimationFrame ||
                              window.clearTimeout ); 

  }

  /**
   * Utility methods
   */
  var utils = {};
  w.utils = utils;


  /**
   * Capture mouse movement and coordinates over canvas element
   *
   * @param {HTMLElement} el - Canvas element to listen for events
   *
   * @return {Object} mouse - object containing mouse coordinates
   * @return {Object} mouse.x - x-axis mouse coordinates
   * @return {Object} mouse.y - y-axis mouse coordinates
   */
  utils.captureMouse = function(el) {

    var mouse = {
      x: 0,
      y: 0
    };

    function mouseListener(e) {

      mouse.x = e.pageX - el.offsetLeft;
      mouse.y = e.pageY - el.offsetTop;

    }

    el.addEventListener('mousemove', mouseListener);

    return mouse;

  }


  /**
   * Capture touch movement and coordinates over canvas element
   *
   * @param {HTMLElement} el - Canvas element to listen for events
   *
   * @return {Object} touch - object containing touch coordinates
   * @return {Object} touch.x - x-axis touch coordinates
   * @return {Object} touch.y - y-axis touch coordinates
   * @return {Boolean} touch.isPressed - true|false if user is currently touching screen
   */
  utils.captureTouch = function(el) {

    var touch = {
      x: 0,
      y: 0,
      isPressed: false
    };

    function touchStartListener() {

      touch.isPressed = true;

    }

    function touchEndListener() {

      touch.isPressed = false;

    }

    function touchMoveListener(e) {

      touch.x = e.touches[0].pageX - el.offsetLeft;
      touch.y = e.touches[0].pageY - el.offsetTop;

    }

    el.addEventListener('touchstart', touchStartListener);
    el.addEventListener('touchend', touchEndListener);
    el.addEventListener('touchmove', touchMoveListener);

    return touch;

  }


  /**
   * Check if rectangle contains x/y coordinates
   *
   * @param {Object} rect - object containing a rectangle
   * @param {Number} rect.x - x-axis coordinate of a rectangle
   * @param {Number} rect.y - y-axis coordinate of a rectangle
   * @param {Number} rect.width - width of a rectangle
   * @param {Number} rect.height - height of a rectangle
   * @param {Number} x - target x-axis coordinate
   * @param {Number} y - target y-axis coordinate
   *
   * @return {Boolean} true|false - if rect contains x/y coordinates
   */
  utils.containsPoint = function(rect, x, y) {

    return !(x < rect.x || x > rect.x + rect.width ||
             y < rect.y || y > rect.y + rect.height);

  }


  /**
   * Check if two rectangles intersect
   *
   * @param {Object} rectA - first object with rectangular bounds
   * @param {Object} rectB - second object with rectangular bounds
   *
   * @return {Boolean} true|false - if rect contains x/y coordinates
   */
  utils.intersects = function(rectA, rectB) {

    return !( rectA.x + rectA.width < rectB.x ||
              rectB.x + rectB.width < rectA.x ||
              rectA.y + rectA.height < rectB.y ||
              rectB.y + rectB.height < rectA.y);

  }
  
  /**
   * Get random number between two numbers
   *
   * @param {Number} min - Minimum value
   * @param {Number} max - Maximum value
   *
   * @return {Number} randomized value between min and max
   */
  utils.rand = function(min, max){
    return (Math.random() * (max - min)) + min;
  }
  
  /**
   * Get random integer between two numbers
   *
   * @param {Number} min - Minimum value
   * @param {Number} max - Maximum value
   *
   * @return {Number} randomized value between min and max
   */
  utils.randInt = function(min, max){
    return Math.floor( (Math.random() * (max - min)) + min );
  }

  /**
   * Get random integer that is a multiple within a range of numbers
   *
   * @param {Number} multiple - Multiple to increment by (and minimum value)
   * @param {Number} range - Range of multiple (and maximum value)
   *
   * @return {Number} randomized value within range, incrementing by multiple
   */
  utils.randMultiple = function(multiple, range){
    return Math.floor( (Math.random() * (range - multiple) + multiple + 1) / multiple ) * multiple;
  }
  
  /**
   * Get heads (TRUE) or tails (FALSE)
   *
   * @return {Boolean} randomized value of TRUE or FALSE
   */
  utils.coinFlip = function(){
    return (Math.floor(Math.random() * 2) == 0);
  }

  /**
   * Get current screen size (width / height)
   *
   * @return {Object} screen - width / height of current screen object
   */
  utils.screenSize = function(){
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.body,
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    return {
      width: x,
      height: y
    };
  };

  
  utils.colorToRGB = function (color, alpha) {
    //number in octal format or string prefixed with #
    if (typeof color === 'string' && color[0] === '#') {
      color = window.parseInt(color.slice(1), 16);
    }
    
    alpha = (alpha === undefined) ? 1 : alpha;
    //parse hex values
    
    var r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & 0xff,
        a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
    //only use 'rgba' if needed
    
    if (a === 1) {
      return "rgb("+ r +","+ g +","+ b +")";
    } else {
      return "rgba("+ r +","+ g +","+ b +","+ a +")";
    }
  }
  
  utils.convertRange = function(value, oldRange, newRange){
    var OldRange = (oldRange.max - oldRange.min); 
    var NewRange = (newRange.max - newRange.min);
    
    return (((value - oldRange.min) * NewRange) / OldRange) + newRange.min;
  }

  utils.deviceOrientationSupport = function() {
    return !!window['DeviceOrientationEvent'];
  }

  utils.touchSupport = function() {
    return ('ontouchstart' in window);
  }
  
  utils.allowDeviceOrientation = function() {
    return utils.deviceOrientationSupport() && utils.touchSupport();
  }


  /** 
   * On-screen visual log
   *
   * @param {String} console - class name of HTMLELement to use as console
   * @param {String} output - Text string to output
   */
  utils.consoleLog = function(console, output){

    document.querySelectorAll(console)[0].value = output;

  }


  /** 
   * Display UI Coordinates
   *
   * @param {HTMLElement} element - Canvas element to listen for events
   * @param {Object} mouse - Object containing mouse coordinates
   * @param {Object} touch - Object containing touch coordinates
   * @param {String} which - 'mouse'|'touch' - string containing which type of device input
   */
  utils.displayCoordinates = function(el, mouse, touch, which){

    function canvasTouchListener(){

      this.consoleLog('.console', 'x: ' + touch.x + ', y: ' + touch.y); 

    }

    function canvasMouseListener(){

      if (mouse.current){
        this.consoleLog('.console', 'x: ' + mouse.current.x + ', y: ' + mouse.current.y); 
      } else {
        this.consoleLog('.console', 'x: ' + mouse.x + ', y: ' + mouse.y); 
      }

    }

    if (touch && which === 'touch'){
      el.addEventListener('touchmove', canvasTouchListener);
    } else {
      el.addEventListener('mousemove', canvasMouseListener);
    }

  }


  /** 
   * Setup mouse/touch canvas listeners in aggregate
   *
   * @param {HTMLElement} element - Canvas element to listen for events
   * @param {Object} mouse - Object containing mouse coordinates
   * @param {Object} touch - Object containing touch coordinates
   * @param {String} which - 'mouse'|'touch' - string containing which type of device input
   */
  utils.setupHelpers = function(el, mouse, touch, which){

    this.displayCoordinates(el, mouse, touch, which);

  }
  
  /**
   * @author Joseph Lenton - PlayMyCode.com
   *
   * @param first An ImageData object from the first image we are colliding with.
   * @param x The x location of 'first'.
   * @param y The y location of 'first'.
   * @param other An ImageData object from the second image involved in the collision check.
   * @param x2 The x location of 'other'.
   * @param y2 The y location of 'other'.
   * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
   */
  utils.isPixelCollision = function( first, x, y, other, x2, y2, isCentred ){
    // we need to avoid using floats, as were doing array lookups
    x  = Math.round( x );
    y  = Math.round( y );
    x2 = Math.round( x2 );
    y2 = Math.round( y2 );

    var w  = first.width,
        h  = first.height,
        w2 = other.width,
        h2 = other.height ;

    // deal with the image being centred
    if ( isCentred ) {
        // fast rounding, but positive only
        x  -= ( w/2 + 0.5) << 0
        y  -= ( h/2 + 0.5) << 0
        x2 -= (w2/2 + 0.5) << 0
        y2 -= (h2/2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    var xMin = Math.max( x, x2 ),
        yMin = Math.max( y, y2 ),
        xMax = Math.min( x+w, x2+w2 ),
        yMax = Math.min( y+h, y2+h2 );

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if ( xMin >= xMax || yMin >= yMax ) {
        return false;
    }

    var xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    var pixels  = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if ( xDiff < 4 && yDiff < 4 ) {
        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                        ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                ) {
                    return true;
                }
            }
        }
    } else {
        /* What is this doing?
         * It is iterating over the overlapping area,
         * across the x then y the,
         * checking if the pixels are on top of this.
         *
         * What is special is that it increments by incX or incY,
         * allowing it to quickly jump across the image in large increments
         * rather then slowly going pixel by pixel.
         *
         * This makes it more likely to find a colliding pixel early.
         */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        var incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);

        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                        if (
                                ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
  }

})(window);
