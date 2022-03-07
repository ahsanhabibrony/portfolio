$(function(){
	'use strict';
	//Slider
	var $owl = $('.owl');
	$owl.each( function() {
		var $a = $(this);
		$a.owlCarousel({
			transitionStyle: $a.attr('data-transitionstyle'),
			autoPlay:  JSON.parse($a.attr('data-autoplay')),
			singleItem: JSON.parse($a.attr('data-singleItem')),
			items : $a.attr('data-items'),
			itemsDesktop : [1199,$a.attr('data-itemsDesktop')],
			itemsDesktopSmall : [979,$a.attr('data-itemsDesktopSmall')],
			itemsTablet:  [797,$a.attr('data-itemsTablet')],
			itemsMobile :  [479,$a.attr('data-itemsMobile')],
			navigation : JSON.parse($a.attr('data-buttons')),
			pagination: JSON.parse($a.attr('data-pag')),
			navigationText: ["",""]
		});
	});
	//Preloader
	$(window).load(function()
	{
		$('.preloader i').fadeOut();
		$('.preloader').delay(500).fadeOut('slow');
		$('body').delay(600).css({'overflow':'visible'});
	});
	//Magnific-popup
	$('.image-zoom').magnificPopup({
		type:'image',
		gallery: {
			enabled: true
		},
	});
	//Menu
	$('.navbar-toggle').on('click',function(){
		height_w(); 
	});
	function height_w()
	{
		$('.navbar-nav').css('max-height',$(window).height()-165);
	}
	window.onresize = function()
	{
		height_w();
	}
	//cart dropdown
	$('.cart .dropdown-menu').on('click',function(e) {
		e.stopPropagation();  
	});
	//Filter price
	$( ".slider-range" ).slider({
		range: true,
		min: 5000,
		max: 200000,
		step: 1000,
		values: [ 60000, 130000 ],
		slide: function( event, ui ) {
			$( ".slider_amount" ).val( "$" + ui.values[ 0 ].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + ui.values[ 1 ].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});
	$( ".slider_amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + $( ".slider-range" ).slider( "values", 1 ).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );



	$('#quiz').quiz({
		//resultsScreen: '#results-screen',
		//counter: false,
		//homeButton: '#custom-home',
		counterFormat: 'Question %current of %total',
		finishButtonText: 'Thank you', //Text on the finish button 
		questions: [
		  {
			'q': 'How old is your baby?',
			'options': [
			  'Below 3 years',
			  '3 years old and above'
			],
			'correctIndex': 1,
			'correctResponse': '',
			'incorrectResponse': ''
		  },
		  {
			'q': 'Have you ever win online gift card before?',
			'options': [
			  'Yes',
			  'No'
			],
			'correctIndex': 2,
			'correctResponse': '',
			'incorrectResponse': ''
		  },
		  {
			'q': 'Whats the gender of your last children ?',
			'options': [
			  'Male',
			  'Female'
			],
			'correctIndex': 2,
			'correctResponse': '',
			'incorrectResponse': ''
		  },
		]
	  });




});