/*Global variables*/

var $gallery = $(".gallery a");
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $captionTitle = $("<h3></h3>");
var $caption = $("<p></p>");
var $closeButton = $('<button id="closeButton"></button>');
var $prevButton = $('<button id="prevButton"></button>');
var $nextButton = $('<button id="nextButton"></button>');
var $currentImage; /*create variable to track current index number for retrieving photos*/

/* Create arrays for easy access to photo attributes*/
var $imageSrcArray = $gallery.map(function() {
  return $(this).attr("href");
}).get();

var $titleArray = $gallery.map(function () {
	return $(this).children("img").attr("title");
}).get();

var $captionArray = $gallery.map(function () {
	return $(this).children("img").attr("alt");
}).get();

/* Add overlay to page */
$overlay.append($image);
$overlay.append($closeButton);
$overlay.append($prevButton);
$overlay.append($nextButton);
$overlay.append($captionTitle);
$overlay.append($caption);
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
  var titleText = $(this).children("img").attr("title");
  var captionText = $(this).children("img").attr("alt");
  $captionTitle.text(titleText);
  $caption.text(captionText);
});

$("#filter").keyup(function () {
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
  

/*Helper functions*/
function createOverlayWithImage(image) {	
	$overlay.children().fadeOut(600);
	$image.attr("src", $imageSrcArray[image]);
	$captionTitle.text($titleArray[image]);
	$caption.text($captionArray[image]);
	$overlay.children().fadeIn(800);
}


	
