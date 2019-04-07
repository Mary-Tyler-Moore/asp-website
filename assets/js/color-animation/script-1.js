
var isScrollingTimeout;
var isScrolling = false;

(function(w, $){
    'use strict';

    // Globals
    var utils = w.utils,
        requestAnimationFrame = w.requestAnimationFrame,
        
        // Set variables for canvas
        $canvas   = $('#color-animation-bg')[0],
        $textarea = $('.console')[0],
        context = $canvas.getContext('2d'),
        left    = 0,
        top     = 0,
        right   = utils.screenSize().width - left,
        bottom  = utils.screenSize().height - top,
        centerX = utils.screenSize().width / 2,
        centerY = utils.screenSize().height / 2,
  
        /** 
         * Particle settings
         */
        fir_balls  = [],
        numOfBalls = 500,
        colors     = [
          '#F7C758',
          '#6B1DCB',
          '#FD3058',
          '#FE9B58'
        ],
        speed       = 0.001,
        trailLength = 0,
              
  
        /** 
         * Capture mouse behavior
         */
        isMouseDown;
      
      $canvas.width  = utils.screenSize().width;
      $canvas.height = utils.screenSize().height;
      
    document.addEventListener('mousedown', mouseDownCallback);
    document.addEventListener('mouseup', mouseUpCallback);
  
  
      /** 
       * Mouse Down callback
       *
       */
      function mouseDownCallback(e){
      isMouseDown = true;
        $textarea.className += " inactive";
      }
  
  
      /** 
       * Mouse Up callback
       *
       */
      function mouseUpCallback(e){
      isMouseDown = false;
      }
  
  
      /** 
       * Resize canvas to fullscreen
       */
      window.addEventListener('resize', windowResizeCallback);

      // isScrolling

      window.addEventListener('scroll', function ( event ) {
        isScrolling = true;

        // Clear our timeout throughout the scroll
        window.clearTimeout( isScrollingTimeout );
    
        // Set a timeout to run after scrolling ends
        isScrollingTimeout = setTimeout(function() {

            isScrolling = false;
    
        }, 66);
    
    }, false);
      
      
      /** 
       * Window Resize Callback
       */
      function windowResizeCallback(){
          $canvas.width  = utils.screenSize().width;
          $canvas.height = utils.screenSize().height;
      centerX = utils.screenSize().width / 2,
      centerY = utils.screenSize().height / 2,
      right   = utils.screenSize().width - left;
      bottom  = utils.screenSize().height - top;
      }
      
  
      /**
       * Generate particles
       */
      function generateParticles(particles, num){
          
          for (var i = 0; i < num; i++){
          
              // Generate new Ball instance
              var particle = new Ball(
  
                  // Random size from 1-4
                  utils.rand(0, 2),
           
          // color
          null,
           
          // image
          null,
          
          // isHSLA
          true,
          
          // isShadow
          8
              );
   
              // Set ball velocity
              particle = generateVelocity(particle, i);
  
              // Add ball to array
              particles.push(particle);
  
          }
          
          return particles;
      
      }
  
  
      /** 
       * Generate ball coordinates and velocity (speed * direcrion)
       *
       * @param {Object} ball - Instance 2D Ball context
       *
       * @return {Object} ball - Updated instance of Ball
       */
      function generateVelocity(ball, index){
          
          // Set starting position
      ball.angle = utils.rand(1, 360);
      ball.range = utils.rand(1, $canvas.height);
      
      // Set hue based on distance from center
      var hue = (((ball.range - 1) * (300 - 200)) / (((bottom - top) / 2) - 1)) + 140;
      
      ball.color = 'hsla(' + hue + ', 75%, 45%, 1.00)';
      
          return ball;
      
      }
      
  
      /**
       * Draw ball motion
       *
       * @param {Object} ball - Instance 2D Ball context
       */
      function drawBall(ball, index){
      
      // Set speed based on distance from center
      ball.speed = (ball.range / ((bottom - top) / 2)) * speed + speed;
          
          // Move balls
      
      ball.x = centerX + Math.cos(ball.angle) * ball.range;
      ball.y = centerY + Math.sin(ball.angle) * ball.range;
          ball.angle += ball.speed;
          
          // draw ball to canvas
          if (ball){
            ball.draw(context, utils);
          }
      
      }
      
      generateParticles(fir_balls, numOfBalls);
    
    // Animation IIFE loop
    (function animate(){
      
      // Call request animation frame recursively
      requestAnimationFrame(animate, $canvas);
      
      if ((isMouseDown || isScrolling) && trailLength < 95) {
        trailLength += 5;
      } else if ((!isMouseDown || !isScrolling) && trailLength > 0) {
        trailLength -= 0.5;
      }
      
      if ((isMouseDown || isScrolling) && speed < 0.005){
        speed += 0.0005;
      } else if ((!isMouseDown && !isScrolling) && speed > 0.001) {
        speed -= 0.00005;
      }
          
          // Clear canvas every frame
          context.fillStyle = utils.colorToRGB('#000', (100 - trailLength) / 100);
      // context.fillStyle = '#000';
          context.fillRect(0, 0, $canvas.width, $canvas.height);
      
      // do stuff...
      for (var i = 0; i < fir_balls.length; i++){
          drawBall(fir_balls[i], i);
      }
    })();
  
  })(
  window,
  document.querySelectorAll.bind(document)
  );