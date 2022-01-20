
//BACK TO TOP
mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//NAVBAR
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

//TEXT ROTATION
jQuery(document).ready(function($){
//set animation timing
var animationDelay = 800,
    //loading bar effect
    barAnimationDelay = 50,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect 
    revealDuration = 600,
    revealAnimationDelay = 2000;

initHeadline();


function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($('.box-headline.letters').find('b'));
    //initialise headline animation
    animateHeadline($('.box-headline'));
}

function singleLetters($words) {
    $words.each(function(){
        var word = $(this),
            letters = word.text().split(''),
            selected = word.hasClass('is-visible');
        for (i in letters) {
            if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
            letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
    });
}

function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function(){
        var headline = $(this);
        
        if(headline.hasClass('loading-bar')) {
            duration = barAnimationDelay;
            setTimeout(function(){ headline.find('.box-words-wrapper').addClass('is-loading') }, barWaiting);
        } else if (headline.hasClass('clip')){
            var spanWrapper = headline.find('.box-words-wrapper'),
                newWidth = spanWrapper.width() + 10
            spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type') ) {
            //assign to .box-words-wrapper the width of its longest word
            var words = headline.find('.box-words-wrapper b'),
                width = 0;
            words.each(function(){
                var wordWidth = $(this).width();
                if (wordWidth > width) width = wordWidth;
            });
            headline.find('.box-words-wrapper').css('width', width);
        };

        //trigger animation
        setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
    });
}

function hideWord($word) {
    var nextWord = takeNext($word);
    
    if($word.parents('.box-headline').hasClass('type')) {
        var parentSpan = $word.parent('.box-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');	
        setTimeout(function(){ 
            parentSpan.removeClass('selected'); 
            $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
    
    } else if($word.parents('.box-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

    }  else if($word.parents('.box-headline').hasClass('clip')) {
        $word.parents('.box-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
            switchWord($word, nextWord);
            showWord(nextWord);
        });

    } else if ($word.parents('.box-headline').hasClass('loading-bar')){
        $word.parents('.box-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
        setTimeout(function(){ $word.parents('.box-words-wrapper').addClass('is-loading') }, barWaiting);

    } else {
        switchWord($word, nextWord);
        setTimeout(function(){ hideWord(nextWord) }, animationDelay);
    }
}

function showWord($word, $duration) {
    if($word.parents('.box-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');

    }  else if($word.parents('.box-headline').hasClass('clip')) {
        $word.parents('.box-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
            setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
        });
    }
}

function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass('in').addClass('out');
    
    if(!$letter.is(':last-child')) {
        setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
    } else if($bool) { 
        setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
    }

    if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
    } 
}

function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass('in').removeClass('out');
    
    if(!$letter.is(':last-child')) { 
        setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
    } else { 
        if($word.parents('.box-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.box-words-wrapper').addClass('waiting'); }, 200);}
        if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
    }
}

function takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function takePrev($word) {
    return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
}

function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
}
});

jQuery(document).ready(function($){
//set animation timing
var animationDelay = 5000,
    //loading bar effect
    barAnimationDelay = 2000,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect
    revealDuration = 600,
    revealAnimationDelay = 1200;

initHeadline();


function initHeadline() {
//insert <i> element for each letter of a changing word
singleLetters($('.cd-headline.letters').find('b'));
//initialise headline animation
animateHeadline($('.cd-headline'));
}

function singleLetters($words) {
$words.each(function(){
    var word = $(this),
        letters = word.text().split(''),
        selected = word.hasClass('is-visible');
    for (i in letters) {
    if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
    }
    var newLetters = letters.join('');
    word.html(newLetters).css('opacity', 1);
});
}

function animateHeadline($headlines) {
var duration = animationDelay;
$headlines.each(function(){
    var headline = $(this);

    if(headline.hasClass('loading-bar')) {
    duration = barAnimationDelay;
    setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
    } else if (headline.hasClass('clip')){
    var spanWrapper = headline.find('.cd-words-wrapper'),
        newWidth = spanWrapper.width() + 10
    spanWrapper.css('width', newWidth);
    } else if (!headline.hasClass('type') ) {
    //assign to .cd-words-wrapper the width of its longest word
    var words = headline.find('.cd-words-wrapper b'),
        width = 0;
    words.each(function(){
        var wordWidth = $(this).width();
        if (wordWidth > width) width = wordWidth;
    });
    headline.find('.cd-words-wrapper').css('width', width);
    };

    //trigger animation
    setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
});
}

function hideWord($word) {
var nextWord = takeNext($word);

if($word.parents('.cd-headline').hasClass('type')) {
    var parentSpan = $word.parent('.cd-words-wrapper');
    parentSpan.addClass('selected').removeClass('waiting');
    setTimeout(function(){
    parentSpan.removeClass('selected');
    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
    }, selectionDuration);
    setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

} else if($word.parents('.cd-headline').hasClass('letters')) {
    var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
    hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
    showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

}  else if($word.parents('.cd-headline').hasClass('clip')) {
    $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
    switchWord($word, nextWord);
    showWord(nextWord);
    });

} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
    $word.parents('.cd-words-wrapper').removeClass('is-loading');
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
    setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

} else {
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, animationDelay);
}
}

function showWord($word, $duration) {
if($word.parents('.cd-headline').hasClass('type')) {
    showLetter($word.find('i').eq(0), $word, false, $duration);
    $word.addClass('is-visible').removeClass('is-hidden');

}  else if($word.parents('.cd-headline').hasClass('clip')) {
    $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
    setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
    });
}
}

function hideLetter($letter, $word, $bool, $duration) {
$letter.removeClass('in').addClass('out');

if(!$letter.is(':last-child')) {
    setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
} else if($bool) {
    setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
}

if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
    var nextWord = takeNext($word);
    switchWord($word, nextWord);
}
}

function showLetter($letter, $word, $bool, $duration) {
$letter.addClass('in').removeClass('out');

if(!$letter.is(':last-child')) {
    setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
} else {
    if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
    if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
}
}

function takeNext($word) {
return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function takePrev($word) {
return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
}

function switchWord($oldWord, $newWord) {
$oldWord.removeClass('is-visible').addClass('is-hidden');
$newWord.removeClass('is-hidden').addClass('is-visible');
}
});

//MEET THE TEAM
$(function(){
    $('.profile_container').on('click', function(e){
      var $biginfo = $('#teamcontent');
      var $bigname = $('#bigname');
      var $bigjob  = $('#bigjob');
      var $bigdesc = $('#bigdesc');
      var $bigimg  = $('.bigimg');  
      
      var newimg  = $(this).find('.profilepic').attr('src');
      var newname = $(this).find('.profilepic').attr('alt');
      var newrole = $(this).siblings('.job').eq(0).html();
      var newdesc = $(this).siblings('.desc').eq(0).html();
      
      $bigimg.css('background-image', "url(" + newimg + ")");
      $bigname.html(newname);
      $bigjob.html(newrole);
      $bigdesc.html(newdesc);
      
      if($biginfo.css('display') == 'none') {
        $biginfo.slideDown(350);
      }
        
      $('html, body').animate({ scrollTop: $('.team_box').offset().top }, 'slow');  
    });
  });
      
  $(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
          
        var hash = this.hash;
  
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          window.location.hash = hash;
        });
      } 
    });
  });

 //SERVICES PAGE
 $(".hover").mouseleave(
    function () {
        $(this).removeClass("hover");
    }
);
 
//SERVICES PAGE CAROUSEL
$(document).ready( function() {
    $('#myCarousel').carousel({
		interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
});

//SERVICES PAGE COMING SOON

var string = "Coming Soon"; 
var array = string.split("");
var timer;

function frameLooper () {
	if (array.length > 0) {
		document.getElementById("text").innerHTML += array.shift();
	} else {
		clearTimeout(timer);
			}
	loopTimer = setTimeout('frameLooper()',70); 

}
frameLooper();



//CONTACT FORM
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });


//SIGNUP/LOGIN FORM
function toggleSignup(){
    document.getElementById("login-toggle").style.backgroundColor="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="#da0037";
     document.getElementById("signup-toggle").style.color="#fff";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.backgroundColor="#da0037";
     document.getElementById("login-toggle").style.color="#fff";
     document.getElementById("signup-toggle").style.backgroundColor="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }
  
  //FOOTER
function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}
