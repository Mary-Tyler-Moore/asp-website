(function (w, $) {
	'use strict';

	// Globals
	var utils = w.utils,
	requestAnimationFrame = w.requestAnimationFrame,

	// Set variables for canvas
	// **** changed .canvas to #color-animation-bg
	$canvas = $('#color-animation-bg')[0],
	context = $canvas.getContext('2d'),
	center = new Ball(5, 'rgba(0,0,0,1.0)'),
	left = 0,
	top = 0,
	right = utils.screenSize().width,
	bottom = utils.screenSize().height,
	centerX = utils.screenSize().width / 2,
	centerY = utils.screenSize().height / 2,

	/** 
                                           * Particle settings
                                           */
	balls = [],
	numOfBalls = 400,
	trailLength = 95;

	$canvas.width = utils.screenSize().width;
	$canvas.height = utils.screenSize().height;

	center.x = $canvas.width / 2;
	center.y = $canvas.height / 2;


	/** 
                                 * Resize canvas to fullscreen
                                 */
	window.addEventListener('resize', windowResizeCallback);


	/** 
                                                           * Window Resize Callback
                                                           */
	function windowResizeCallback() {
		right = $canvas.width = utils.screenSize().width;
		bottom = $canvas.height = utils.screenSize().height;
		centerX = utils.screenSize().width / 2;
		centerY = utils.screenSize().height / 2;
		center.x = $canvas.width / 2;
		center.y = $canvas.height / 2;
	}


	/**
    * Generate particles
    */
	function generateParticles(particles, num) {

		for (var i = 0; i < num; i++) {

			// Generate new Ball instance
			var particle = new Ball(

			// Random size from 1-4
			2,

			// image
			null,

			// color
			null,

			// isHSLA
			true);


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
	function generateVelocity(ball, index) {

		// Set starting position
		ball.x = utils.rand(1, $canvas.width);
		ball.y = utils.rand(1, $canvas.height);

		ball.spring = utils.rand(0.00005, 0.0001);

		var dx = centerX - ball.x,
		dy = centerY - ball.y;

		ball.dist = Math.round(Math.sqrt(dx * dx + dy * dy));

		return ball;

	}


	/**
    * Draw ball motion
    *
    * @param {Object} ball - Instance 2D Ball context
    */
	function drawBall(ball, index) {

		// Move balls

		// Set hue based on distance from center
		var hue = (ball.dist - 1) * (360 - 1) / ((bottom - top) / 2 - 1) + 100;

		ball.color = 'hsla(' + hue + ', 75%, 45%, 1.00)';

		// Get distance to target
		var dx = centerX - ball.x,
		dy = centerY - ball.y,

		// Calculate acceleration (distance * spring)
		ax = dx * ball.spring,
		ay = dy * ball.spring;

		ball.dist = Math.round(Math.sqrt(dx * dx + dy * dy));

		// Calculate velocity (acceleration + distance)
		ball.vx += ax;
		ball.vy += ay;

		// Add velocity to positioning
		ball.x += ball.vx;
		ball.y += ball.vy;

		// draw ball to canvas
		if (ball) {
			ball.draw(context, utils);
		}

	}

	generateParticles(balls, numOfBalls);

	// Animation IIFE loop
	(function animate() {

		// Call request animation frame recursively
		requestAnimationFrame(animate, $canvas);

		// Clear canvas every frame
		context.fillStyle = utils.colorToRGB('#000', (100 - trailLength) / 100);
		context.fillRect(0, 0, $canvas.width, $canvas.height);

		// do stuff...
		for (var i = 0; i < balls.length; i++) {
			drawBall(balls[i], i);
		}

		center.draw(context, utils);
	})();

})(
window,
document.querySelectorAll.bind(document));