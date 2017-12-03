
var isOptionsOpened = false; // captures options toggle bar state
var dropdownState = "closed"; // captures dropdown of locations state (closed | opened)
var currentImage = 0; // sets carousel's initial image

// init. image path for carousel
arrayOfImages = [ 'images/testimonial_one.jpeg', 'images/testimonial_two.jpeg', 'images/testimonial_three.jpeg', 'images/testimonial_four.jpeg' ];

// init. testimonial data
var testimonial = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum ultrices lorem nec porta. Donec a nisl vel tellus euismod luctus vitae dignissim sem. Duis sagittis vitae lorem ut lacinia.";
testimonials = [ {
			"name": "Lorem Ipsum",
			"testimonial": testimonial,
			"star": 4.5
		},{
			"name": "Lorem Ipsum",
			"testimonial": testimonial,
			"star": 3.5
		},{
			"name": "Lorem Ipsum",
			"testimonial": testimonial,
			"star": 4
		},{
			"name": "Lorem Ipsum",
			"testimonial": testimonial,
			"star": 2.5
		}];


$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip(); // activate bootstrap tooltip
	
	setInterval(changeBackgroundImage, 10000); // starts carousel timer
	
	// called when options button clicked
	$('.lines-group').on('click', function() {
		
		// init. niceScroll for branches dropdown and options container
		$(".list-of-branches").niceScroll({cursorwidth: '5px', autohidemode: true, zindex: 999 });
		$(".options-contents").niceScroll({cursorwidth: '0px', autohidemode: true, zindex: 999 });
		
		// identifies options button state
		if(!isOptionsOpened){
			// this block runs if options container not opened so far
			
			// animates the triple lines into cross of options button
			$('.lines-group img').css({'margin-bottom': '-2px'});
			$('.lines-group img:nth-child(2)').css({'opacity': '0'});
			$('.lines-group img:nth-child(1)').css({'transform': 'rotate(45deg)'});
			$('.lines-group img:nth-child(3)').css({'transform': 'rotate(-45deg)'});
			
			// fades in locate tab, about tab and feedback form tab
			$('.options-container').css({'display':'block'});
			$('.options-contents').fadeIn('slow');
			$('.options-container').css({'height': '100%'});
			
			// sets ptions container state (true: open)
			isOptionsOpened = true;
		}else{
			// this block runs if options container is already opened
			
			// animates cross back to triple line
			$('.lines-group img').css({'margin-bottom': '5px'});
			$('.lines-group img:nth-child(2)').css({'opacity': '1'});
			$('.lines-group img').css({'transform': 'rotate(0deg)'});
			
			// fades out locate tab, about tab and feedback form tab
			$('.options-container').css({'height': '0%'});
			$('.options-contents').fadeOut('fast');
			
			// sets options container state (fase: close)
			isOptionsOpened = false;
		}
	});
	
	$('.options, .list-of-branches ul li').on('click', function(){
		$('.list-of-branches').slideToggle('fast');
		$('.options').text($(this).text());
		if( dropdownState == "open" ){
			$('.address').fadeIn('fast');
			dropdownState = "closed";
		}else{
			$('.address').fadeOut('fast');
			dropdownState = "open";
		}
	});
	
});

// changes image on carousel
function changeBackgroundImage(){
	$('#testimonial').fadeOut(200, function(){
		// set data on container
		$('#people').text(testimonials[currentImage].name);
		$('#comment').text(testimonials[currentImage].testimonial);
		
		// gets number of starts
		star = testimonials[currentImage].star;
		
		// clears icons on ratings container
		$('.rating').empty();
		
		// appends fully filled stars on ratings
		for(i=0; i<Math.floor(star); i++)
			$('.rating').append(' <i class="fa fa-star"></i>');
	
		// finds half rating
		fraction = star.toString().substring(star.toString().indexOf('.')+1);
		
		// appends half star
		if(fraction == 5)
			$('.rating').append(' <i class="fa fa-star-half-o"></i>');
			
		// appends empty stars
		if(Math.ceil(star) < 5)
			for(i=0; i<(5-Math.ceil(star)); i++)
				$('.rating').append(' <i class="fa fa-star-o"></i>');
		
		// changes testimonial image
		$('#testimonial').css({
			'background-image': "url('"+arrayOfImages[currentImage]+"')"
		});
		$('#testimonial').fadeIn(1000);
	});
	
	// reset current image index of images array
	currentImage++;
	if(currentImage == 4)
		currentImage = 0;
}