	/*Global variables*/
	
	var $gallery = $(".gallery a");
	var $overlay = $('<div id="overlay"></div>');
	var $figure = $('<figure id="figure"></div>');
	var $image = $("<img>");
	var $figCaption = $('<figcaption id="figCaption"></figcaption>');
	var $closeButton = $('<button id="closeButton"></button>');
	var $prevButton = $('<button id="prevButton"></button>');
	var $nextButton = $('<button id="nextButton"></button>');
	var $currentImage; /*create variable to track current index number for retrieving photos*/
	
	/* Create arrays for easy access to photo attributes*/
	var $imageSrcArray = $gallery.map(function() {
		"use strict";
		return $(this).attr("href");
	}).get();
	
	var $captionArray = $gallery.map(function () {
		"use strict";
		return $(this).children("img").attr("alt");
	}).get();
	
	/* Add overlay to page */
	$overlay.append($figure);
	$figure.append($image);
	$figure.append($figCaption);
	$figure.append($closeButton);
	$figure.append($prevButton);
	$figure.append($nextButton);
	
	$("body").append($overlay);
	
	// Capture the click event on a link to an image
	$(".gallery a").click(function (event) {
		"use strict";
		event.preventDefault();
		var imageLocation = $(this).attr("href");
		// capture selected image href value
		$currentImage = $imageSrcArray.indexOf(imageLocation);
		// update overlay with the full size image link
		$image.attr("src", imageLocation);
		//show overlay
		$overlay.fadeIn();
		var captionText = $(this).children("img").attr("alt");
		$figCaption.text(captionText);
	});
	
	
	// search feature filters images based on caption
	$("#filter").keyup(function () {
			"use strict";
		 // retrieve the input field text
		 var filter = $(this).val();
	
		 // Loop through the comment list
		 $(".gallery a").each(function () {
			var imgCaption = $(this).children("img").attr("alt");
			//    console.log(imgCaption);
			if (imgCaption.search(new RegExp(filter, "i")) < 0) {
				console.log($(this));
				$(this).parent().fadeOut();
			} else {
				 $(this).parent().fadeIn();
			}
		 });
	});
		
	$('button').click(function() {
		"use strict";
		switch(this.id) {
				case 'prevButton':
				if ($currentImage > 0) {
					$currentImage--;
					createOverlayWithImage($currentImage);
				} else {
					$currentImage = $imageSrcArray.length - 1;
					createOverlayWithImage($currentImage);
				}
				break;
				case 'nextButton':
				if ($currentImage < $imageSrcArray.length - 1) {
					$currentImage++;
					createOverlayWithImage($currentImage);
				} else {
					$currentImage = 0;
					createOverlayWithImage($currentImage);			
				} 
				break;
			case 'closeButton':
				$overlay.fadeOut(600);
				break;
			} 
	 });
		
	/*Helper function*/
	function createOverlayWithImage(image) {	
		"use strict";
		$overlay.children().fadeOut(600);
		$image.attr("src", $imageSrcArray[image]);
		$figCaption.text($captionArray[image]);
		$overlay.children().fadeIn(800);
	}
	
	$("#overlay").on("swipe",function(){
		"use strict";
		switch(this.id) {
		case 'prevButton':
		if ($currentImage > 0) {
			$currentImage--;
			createOverlayWithImage($currentImage);
		} else {
			$currentImage = $imageSrcArray.length - 1;
			createOverlayWithImage($currentImage);
		}
		break;
		case 'nextButton':
		if ($currentImage < $imageSrcArray.length - 1) {
			$currentImage++;
			createOverlayWithImage($currentImage);
		} else {
			$currentImage = 0;
			createOverlayWithImage($currentImage);			
		} 
		break;
	case 'closeButton':
		$overlay.fadeOut(600);
		break;
	} 
	});
	