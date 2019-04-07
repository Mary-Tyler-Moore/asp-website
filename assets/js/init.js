/************* Template Init Js File ************************
    Template Name: Fabon - Portfolio Template
    Author: Themescare
    Version: 1.0
    Copyright 2018
*************************************************************/


$(function () {

	"use strict";
	var wind = $(window);

	/*==================================
	ScrollIt Setup
	====================================*/

	$.scrollIt({
		upKey: 38, // key code to navigate to the next section
		downKey: 40, // key code to navigate to the previous section
		easing: 'swing', // the easing function for animation
		scrollTime: 600, // how long (in ms) the animation takes
		activeClass: 'active', // class given to the active nav element
		onPageChange: null, // function(pageIndex) that is called when page is changed
		topOffset: -15 // offste (in px) for fixed top navigation
	});


	/*==================================
	Navbar Scrolling Setup
	====================================*/

	wind.on("scroll", function () {
		var bodyScroll = wind.scrollTop(),
			navbar = $(".navbar")
		if (bodyScroll > 300) {
			navbar.addClass("fixed-top");
		} else {
			navbar.removeClass("fixed-top");
		}
	});


	/*==================================
	Progressbar Setup
	====================================*/

	wind.on("scroll", function () {

		var bodyScroll = wind.scrollTop()

		if (bodyScroll > 500) {

			$('#bar2').barfiller({
				// duration in ms
				duration: 2000
			});

			$('#bar3').barfiller({
				// duration in ms
				duration: 1600
			});

			$('#bar4').barfiller({
				// duration in ms
				duration: 1200
			});

			$('#bar5').barfiller({
				// duration in ms
				duration: 800
			});
		}

	});


});

