
var isOptionsOpened = false; // captures options toggle bar state
var dropdownState = "closed"; // captures dropdown of locations state (closed | opened)
var currentComment = 0; // sets carousel's initial image

$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip(); // activate bootstrap tooltip
	
	setInterval(animateTestimonial, 5000); // starts carousel timer
	
	// called when options button clicked
	$('.lines-group').on('click', function() {
		
		// init. niceScroll for branches dropdown and options container
		$(".location-dropdown").niceScroll({cursorwidth: '2px', autohidemode: true, zindex: -999 });
		$(".options-contents").niceScroll({cursorwidth: '0px', autohidemode: false, zindex: -999 });
		
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
	
	$('.locations .options, .location-dropdown ul li').on('click', function(){
		$('.location-dropdown').slideToggle('fast');
		$('.locations .options').text($(this).text());
		if( dropdownState == "open" ){
			$('.address').fadeIn('fast');
			dropdownState = "closed";
		}else{
			$('.address').fadeOut('fast');
			dropdownState = "open";
		}
	});
	
});

function animateTestimonial(){
	currentComment += 1;
	
	if(currentComment < 3){
		nextTarget = currentComment * 600;
		$('.testimonial').find('.holder').animate({marginLeft: '-'+nextTarget+'px'})
	}else{
		currentComment = 0;
		$('.testimonial').find('.holder').animate({marginLeft: '0px'})
	}
	
}