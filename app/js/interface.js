var IS_LOCAL_HTML = /.*\.html$/.test(window.location.href);
$(document).ready(function() {
    window.interface = {
        init: function () {
            this._init();
            this._bindEvents();
        },
        openRightPanel: function (e) {
            e && e.preventDefault();
            $('.right-panel__content').addClass('is-active');
            $('body').addClass('fixed');
            $('.right-panel__bg').addClass('is-active').animate({opacity: 1}, 200);
        },
        closeRightPanel: function (e) {
            e && e.preventDefault();
            $('.right-panel__content').removeClass('is-active');
            $( 'body' ).removeClass('fixed');
            $('.right-panel__bg').removeClass('is-active').animate({opacity: 0}, 200);
        },
        stylerAll: function () {
            $('.fs').styler();
        },
        openCoursePanel: function (e) {
            e.preventDefault();
            $('.user-course__list').fadeToggle(100);
        },
        closeCoursePanel: function (e) {
            e.preventDefault();
	        $('.user-course__list').fadeOut(100);
        },
        redirectTo: function (url) {
            window.location.href = url;
        },
        scrollToAnchor: function (e, target) {
            e && e.preventDefault();
            var aid = e? $(e.currentTarget).attr("href") : target;
            $('html,body').animate({scrollTop: $(aid).offset().top - 85},'slow');
        },
        _init: function () {
            flexibility(document.documentElement);
            $.responsiveTables();
            if ($('.fs').length > 0) {
                setTimeout(function() {
                    this.stylerAll();
                }.bind(this), 5)
            }
        },
        _bindEvents: function () {
            this._handleClicksOnHashLinks();
            this._handleToggleRightPanel();
            this._handleToggleCoursePanel();
            this._handleScrollToAnchor();
        },
        _handleScrollToAnchor: function () {
            $('body').on( 'click', '.js-scroll-link', this.scrollToAnchor);
        },
        _handleClicksOnHashLinks: function () {
            var selectors = [
                'a[href="#"]',
                'a[href="#/"]',
                'a[href="/#"]'
            ].join(', ');
            $(document).on('click', selectors, function (e) {
                e.preventDefault();
                console.log('Click on a[href=#]');
            });
        },
        _handleToggleRightPanel: function () {
            $(document).on('click', '.js-user-enter', this.openRightPanel);
            $(document).on('click', '.right-panel__exit, .right-panel__bg', this.closeRightPanel);
        },
        _handleToggleCoursePanel: function () {
            $(document).on('click', '.js-user-course__link', this.openCoursePanel);
            $(document).on('click', '.js-user-course__close', this.closeCoursePanel);
        }
    };
    window.interface.init();




    //MENU-HOVER
    $(".top-nav__item").mouseenter(function() {
    	$(".top-nav__item").css({"opacity":"0.6"});
    	$(".user-links a").css({"opacity":"0.6"});
	    $(this).css({"opacity":"1"});
	}).mouseleave(function() {
	    $(".top-nav__item").css({"opacity":"1"});
	    $(".user-links a").css({"opacity":"1"});
	});
	//RIGHT-MENU-HOVER
    $(".user-course").mouseenter(function() {
    	$(".top-nav__item").css({"opacity":"0.6"});
    	$(".user-enter").css({"opacity":"0.6"});
	    $(this).find('.user-course__link').css({"opacity":"1"});
	}).mouseleave(function() {
	    $(".top-nav__item").css({"opacity":"1"});
	    $(".user-enter").css({"opacity":"1"});
	});

	$(".user-enter").mouseenter(function() {
    	$(".top-nav__item").css({"opacity":"0.6"});
    	$(".user-course__link").css({"opacity":"0.6"});
	    $(this).css({"opacity":"1"});
	}).mouseleave(function() {
	    $(".top-nav__item").css({"opacity":"1"});
	    $(".user-course__link").css({"opacity":"1"});
	});

	//SUBMENU-HOVER
    $(".top-submenu__link").mouseenter(function() {
    	$(".top-submenu__link").css({"color":"#80888c"});
	    $(this).css({"color":"#000"});
	}).mouseleave(function() {
	    $(".top-submenu__link").css({"color":"#000"});
	});







	//MENU-MOBILE
	$('body').on('click','.menu-btn', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.page-header').toggleClass('active');
		$('.menu-mobile').slideToggle();
		$( 'body' ).toggleClass('fixed-menu');
		if ($(this).hasClass('active')){
		    $('.menu-bg').addClass('is-active').animate({opacity: 1}, 200);
		} else {
		    $('.menu-bg').removeClass('is-active').animate({opacity: 0}, 200);
		}
	    // $('.right-panel__bg').addClass('is-active').animate({opacity: 1}, 200);

	});
	$('body').on('click','.menu-mobile__item--submenu .menu-mobile__link', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.menu-mobile-submenu').slideToggle();
	});


	//COURSE-CHANGE
	$(".user-course-toggle__link").click(function(e){
		e.preventDefault();
	    var num = $(this).data('num');

	    $(".user-course-toggle__link").removeClass('active');
	    $(this).addClass('active');

	    $(".change-item").addClass('dnone');
	    $("#course"+num).removeClass('dnone');

   	});



	//ABOUT-PAGE slider
	if ($('.slider-default').length>0) {
		var $gallery = $('.slider-default');
		var slideCount = null;

		$( document ).ready(function() {
		    $gallery.slick({
				speed: 250,
				fade: true,
				cssEase: 'linear',
				swipe: true,
				swipeToSlide: true,
				touchThreshold: 10,
				arrows:true,
				useTransform:true,
				accessibility: false,
				infinite: false,
		    });
		});

		$gallery.on('init', function(event, slick){
			slideCount = slick.slideCount;
			setSlideCount();
			setCurrentSlideNumber(slick.currentSlide);
		});

		$gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  setCurrentSlideNumber(nextSlide);
		});

		function setSlideCount() {
		  var $el = $('.slide-count-wrap').find('.total');
		  $el.text(slideCount);
		}

		function setCurrentSlideNumber(currentSlide) {
		  var $el = $('.slide-count-wrap').find('.current');
		  $el.text(currentSlide + 1);
		}
	};

	//MIDDLE slider
	if ($('.middle-slider').length>0) {
		var $gallery = $('.middle-slider');

	    $gallery.slick({
			speed: 250,
			fade: true,
			cssEase: 'linear',
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			useTransform:true,
			accessibility: false,
			infinite: false,
			responsive: [
			    {
			      breakpoint: 1000,
			      settings: {
			        adaptiveHeight:true,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        dots:true,
			        adaptiveHeight:true,
			      }
			    },
		  	]
	    });
	};


	//VIDEO POPUP
	$('.defauil-video__play').magnificPopup({
		type: 'iframe',
		//removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function() {
			// just a hack that adds mfp-anim class to markup
			this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
			this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		mainClass: 'mfp-zoom-out'
		//midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


	//MIDDLE slider
	if ($('.index-curators__slider').length>0) {
		var $gallery = $('.index-curators__slider');

	    $gallery.slick({
			speed: 250,
			// fade: true,
			// cssEase: 'linear',
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			dots:false,
			useTransform:true,
			accessibility: false,
			infinite: false,
			slidesToShow: 4,
  			slidesToScroll: 1,
  			responsive: [
			    {
			      breakpoint: 1000,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 550,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        adaptiveHeight:true,
			      }
			    },
			]
	    });
	};



	//Show-password
	$( 'body' ).on( 'click', '.toggle-pass', function( event ) {
	    $(this).toggleClass('active');
	    if( $(this).is('.active') ){
	        $(this).prev().attr('type','text');
	    }else{
	        $(this).prev().attr('type','password');
	    }
	    return false;
	});

	//FILTER TOGGLE
	$( 'body' ).on( 'click', '.page-filter-submenu__toggle', function(e) {
	    e.preventDefault();
	    $(this).toggleClass('active');
	    $(this).parents('.has-submenu').find('.page-filter-submenu').slideToggle(150);
	});

	//FILTER TOGGLE-SECOND
	$( 'body' ).on( 'click', '.page-filter-submenu-second__toggle', function(e) {
	    e.preventDefault();
	    $(this).toggleClass('active');
	    $(this).parents('.page-filter-second').find('.page-filter-submenu-second').slideToggle(150);
	});


	$( 'body' ).on( 'click', '.vocabulary-panel__link--cursor', function(e) {
	    e.preventDefault();
	    $(this).addClass('active');
	    $('.vocabulary-panel__toggle').fadeIn(100);
	});
	$( 'body' ).on( 'click', '.vocabulary-panel__close', function(e) {
	    e.preventDefault();
	    $('.vocabulary-panel__link--cursor').removeClass('active');
	    $('.vocabulary-panel__toggle').fadeOut(100);
	});

	$(document).mouseup(function (e){
		var div = $(".vocabulary-panel__toggle");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			div.fadeOut();
		 	$('.vocabulary-panel__link--cursor').removeClass('active');
		}
	});

	//SHOW FILTER
	$( 'body' ).on( 'click', '.filter-link', function(e) {
	    e.preventDefault();
	    $('.page-filter').fadeToggle(100);
	});


	$( 'body' ).on( 'click', '.user-watch__link', function(e) {
	    e.preventDefault();
	    $(this).toggleClass('active');
	    $(this).parents('.learn-item-descr,.user-lecture__links,.examen-materials__toggle').next('.user-watch__list').toggleClass('active');
	});


	var shrinkHeader = 80;

	var scroll = getCurrentScroll();
  	if ( scroll >= shrinkHeader ) {
       $('.page-header').addClass('fixed');
    }
    else {
        $('.page-header').removeClass('fixed');
    }

	function getCurrentScroll() {
    	return window.pageYOffset || document.documentElement.scrollTop;
    }


    //PHONE-SELECT
    if (IS_LOCAL_HTML) {
        if ($(".phoneselect").length>0) {
            $(".phoneselect").intlTelInput({
            autoPlaceholder: "off",
            initialCountry:"ru",
            //    utilsScript: "js/vendors/telinput/utils.js"
            nationalMode: false,
            preventInvalidDialCodes: true
            });
        };
    }




    //VIDEO slider
	if ($('.video-slider-view').length>0) {
		var $gallery = $('.video-slider-view');

	    $gallery.slick({
			speed: 250,
			fade: true,
			cssEase: 'linear',
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			useTransform:true,
			accessibility: false,
			infinite: false,
			asNavFor: '.video-thumbs-slider'
			// responsive: [
			//     {
			//       breakpoint: 1000,
			//       settings: {
			//         adaptiveHeight:true,
			//       }
			//     },
			//     {
			//       breakpoint: 600,
			//       settings: {
			//         dots:true,
			//         adaptiveHeight:true,
			//       }
			//     },
		 //  	]
	    });
	};
	//VIDEO-THUMBS slider
	if ($('.video-thumbs-slider').length>0) {
		var $gallery = $('.video-thumbs-slider');

	    $gallery.slick({
			speed: 250,
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			dots:false,
			useTransform:true,
			accessibility: false,
			infinite: false,
			slidesToShow: 6,
  			slidesToScroll: 1,
  			asNavFor: '.video-slider-view',
  			focusOnSelect: true,
			responsive: [
			    {
			      	breakpoint: 1200,
			      	settings: {
			        	slidesToShow: 5,
  						slidesToScroll: 1,
			      	}
			    },
			    {
			      	breakpoint: 1000,
			      	settings: {
			        	slidesToShow: 4,
  						slidesToScroll: 1,
			      	}
			    },
			    {
			      	breakpoint: 800,
			      	settings: {
			        	slidesToShow: 3,
  						slidesToScroll: 1,
			      	}
			    },
			    {
			      	breakpoint: 600,
			      	settings: {
			        	slidesToShow: 2,
  						slidesToScroll: 1,
			      	}
			    },
			    {
                    breakpoint: 500,
			      	settings: {
			        	slidesToShow: 1,
  						slidesToScroll: 1,
			      	}
			    },
		  	]
	    });
	};



	//OTHER slider
	if ($('.other-slider').length>0) {
		var $gallery = $('.other-slider');

	    $gallery.slick({
			speed: 250,
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			useTransform:true,
			accessibility: false,
			infinite: false,
			slidesToShow: 4,
  			slidesToScroll: 1,
			responsive: [
			    {
			      breakpoint: 1000,
			      settings: {
			        slidesToShow: 3,
  					slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow:2,
  					slidesToScroll: 1
			      }
			    },
			    {
			      breakpoint: 550,
			      settings: {
			        slidesToShow:1,
  					slidesToScroll: 1
			      }
			    },
		  	]
	    });
	};
	if ($('.other-slider-min').length>0) {
		var $gallery = $('.other-slider-min');

	    $gallery.slick({
			speed: 250,
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 10,
			arrows:true,
			useTransform:true,
			accessibility: false,
			infinite: false,
			slidesToShow: 3,
  			slidesToScroll: 1,
			responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow:2,
  					slidesToScroll: 1
			      }
			    },
			    {
			      breakpoint: 550,
			      settings: {
			        slidesToShow:1,
  					slidesToScroll: 1
			      }
			    },
		  	]
	    });
	};



	$( 'body' ).on( 'click', '.js-video-list-link', function( event ) {
		event.preventDefault();
	    $(this).toggleClass('active');
	    $('.video-thumbs').toggleClass('active');
	});



	//POPUP-INLINE
	$('.js-popup').magnificPopup({
		type: 'inline',
		removalDelay: 500,

		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			},
		},

		//midClick: true,
	});



	$( 'body' ).on( 'click', '.js-exam-watch__link', function( event ) {
		event.preventDefault();
		$(this).parents('.examen__item').find('.examen-toggle').slideDown();
		$('.examen-materials__toggle').removeClass('active');
		$(this).parents('.examen-materials__toggle').addClass("active");
	    var toggle = $(this).data('toggle');
	    $(".examen-toggle__item").addClass('dnone');
	    $("#view-"+toggle).removeClass('dnone');
   	});


	$( 'body' ).on( 'click', '.js-result-item__link', function( event ) {
		event.preventDefault();
		//$('.result-item').removeClass('active');
		$(this).parents('.result-item').toggleClass('active');
		$(this).parents('.result-item').find('.result-exam').slideToggle(10);
   	});

   	$( 'body' ).on( 'click', '.js-result-exam__link', function( event ) {
		event.preventDefault();
		$(this).parents('.result-exam').find('.result-exam__list').slideDown();
		$('.result-exam__link').removeClass('active');
		$(this).addClass("active");
	    var toggle = $(this).data('toggle');
	    $(this).parents('.result-exam').find(".result-exam__item").addClass('dnone');
	    $("#view-"+toggle).removeClass('dnone');
   	});


   	$( 'body' ).on( 'click', '.js-result-exam__work', function( event ) {
		event.preventDefault();
		$(this).toggleClass('active');
		$(this).parents('.result-exam-char').find('.result-comments').slideToggle();
   	});

    //CABINET-DATA-CHANGE
    if (IS_LOCAL_HTML) {
        $( 'body' ).on( 'click', '.js-data-change', function(e) {
            e.preventDefault();
            $(this).parents('.cabinet-item').find('.data-change').html( "<div class='input-wrap input-wrap--change'><input type='text' placeholder='Изменить'><a href='#' class='btn js-btn-done'>Изменить</a></div>" );
        });
        $( 'body' ).on( 'click', '.js-btn-done', function(e) {
            e.preventDefault();
            var inputVal = $(this).prev('input').val();
            //console.log(inputVal);
            if (inputVal) {
                $(this).parents('.cabinet-item').find('.data-change').html(inputVal + '<a href="#" class="data-change__link js-data-change"></a>');
            }
        });
    }
	$( 'body' ).on( 'click', '.data-remove', function(e) {
	    e.preventDefault();
	    $(this).parents('.cabinet-phones__item').remove();
	});
	$( 'body' ).on( 'click', '.js-add-phone', function(e) {
	    e.preventDefault();
	    $(this).parents('.cabinet-item').find('.cabinet-phones__item--code').removeClass('dnone');
	});

	//TOOLTIP
	if ($('.tooltip').length>0) {
		$('.tooltip').tooltipster({
			animation: 'fade',
   			delay: 100,
   			'maxWidth': 500,
		});
	};

   	//courseSliderStart();

   	if ($('.vocabulary-list--mobile').length>0) {
   		$(".vocabulary-list--mobile").sticky({topSpacing:94});
   	}
});



$(function(){
 	var shrinkHeader = 80;
  	$(window).scroll(function() {
    	var scroll = getCurrentScroll();
      	if ( scroll >= shrinkHeader ) {
           $('.page-header').addClass('fixed');
        }
        else {
            $('.page-header').removeClass('fixed');
        }
  	});
	function getCurrentScroll() {
    	return window.pageYOffset || document.documentElement.scrollTop;
    }
});


// $(window).resize(function () {
// 	courseSliderStart();
// });

// $(window).load(function(){

// });

// functions

// function courseSliderStart() {
// 	if ($('.course').length>0) {
// 		var $course = $('.course');
// 		if($(window).width() < 750) {
// 			$course.not('.slick-initialized').slick({
// 			  	speed: 250,
// 				swipe: true,
// 				swipeToSlide: true,
// 				touchThreshold: 10,
// 				arrows:true,
// 				useTransform:true,
// 				accessibility: false,
// 				infinite: false,
// 				slidesToShow: 2,
// 	  			slidesToScroll: 1,
// 				responsive: [
// 				    {
// 				      breakpoint: 550,
// 				      settings: {
// 				        slidesToShow:1,
// 	  					slidesToScroll: 1
// 				      }
// 				    },
// 			  	]
// 			});
// 		} else{
// 			if($course.hasClass('slick-initialized')) {
// 				$course.slick("unslick");
// 			}
// 		}
// 	}
// }

// links pages
if (IS_LOCAL_HTML) {
    $('body').append(
    	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
    		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
    	<style> \
    		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
    		#pages a { text-decoration: none; } \
    		#pages li { margin: 5px 0; } \
    	</style> \
    	<ol id="pages"> \
    		<li><a href="about.html">О нас</a></li> \
    		<li><a href="index.html">Главная(Лекции)</a></li> \
    		<li><a href="index2.html">Главная(Курсы)</a></li> \
    		<li><a href="vocabulary.html">Словарь</a></li> \
    		<li><a href="spisok.html">Список курсов</a></li> \
    		<li><a href="cabinet1.html">Кабинет1</a></li> \
    		<li><a href="cabinet2.html">Кабинет2</a></li> \
    		<li><a href="cabinet3.html">Кабинет3</a></li> \
    		<li><a href="course.html">Курс</a></li> \
    		<li><a href="result.html">Result</a></li> \
    		<li><a href="test.html">Test</a></li> \
    		<li><a href="page404.html">Page404</a></li> \
    	</ol> \
    </div>');
}
