var APP = {};
APP.$document = $(document);
APP.$slider = $('.main-fourth__slider');
APP.$showMoreBtn = $('.js-show-more');
APP.$showPriceBtn = $('.js-show-price');
APP.$carCircle = $('.circle-list__item');
APP.$hamburger = $('.hamburger');
APP.$dopdownMenu = $('.header-content__menu');


APP.$document.ready(function(){

  APP.$hamburger.on('click', function(){
    $(this).toggleClass('active');
    APP.$dopdownMenu.toggleClass('active');
  });
  
  var i = 0;
  APP.$showPriceBtn.on('click', function(){
    var buttons = $('.circle-list__item, .price-list__item');
    
    i++;
    if(i == 1){
      $(this).addClass('active');
      buttons.removeClass('active');
      buttons.addClass('active');
    }else{
      $(this).removeClass('active');
       buttons.removeClass('active');
       i = 0;
    }
  });

  $(window).resize(function(){
    var windowWidth = $(window).width(),
        activeBtn = $('.js-show-price.active');

    if(windowWidth < 1280){
      activeBtn.click();
    }

  });

  APP.$carCircle.on('click', function(){
    var attribute = $(this).attr('data-target'),
        chevron = $('.price-list__item'),
        targetEl = $('.price-list__item[data-target=' + attribute + ']');

    APP.$showPriceBtn.removeClass('active')
    chevron.not(targetEl).removeClass('active');
    APP.$carCircle.not(this).removeClass('active');
    $(this).toggleClass('active');
    targetEl.toggleClass('active');
  });
// slick
  function initSlick(rootNode, options) {
    var defaults = {
        arrows:true,
        dots: true,
        prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="icon-uniE830"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="icon-uniEA47"></i></button>',
        speed: 300,
    }

    for (var option in options) {
        defaults[option] = options[option];
    }

    $(rootNode).slick(defaults);
  };

  var slickMap = [{
      node: '.main-third__slider',
      options: {
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      },
  },{
      node: '.main-fourth__slider',
      options: {
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 719,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },{
          breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
        ]
      },
  }
  ];
  slickMap.forEach(function(slick){
      initSlick(slick.node, slick.options)
  });


  function currentSlideClone(){
    var cloneContent = APP.$slider.find('.slick-current .completed-card__content').clone();

    $('.active-slide').html(cloneContent);
  };
  currentSlideClone();
  APP.$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var container = $('.active-slide');

    setTimeout(function(){
      container.fadeOut(300);

      setTimeout(function(){
        container.fadeIn(300);

        currentSlideClone();
      },300);
    },0)
    
  });
//

function currentSlideCount(item){
  var dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

$('.slider-counter').each(function(key, item){

  currentSlideCount(item)

  $(item).on('afterChange', function(event, slick, currentSlide, nextSlide){
    currentSlideCount(item)
  });

});

// show more 
function hideShowBtn(){
  var reviewsCardLenght = $('.reviews-card').length;

  if($('.reviews-card:visible').length == reviewsCardLenght){
    APP.$showMoreBtn.addClass('disabled');
  };
};
hideShowBtn();

APP.$showMoreBtn.on('click', function(){
  var visibleReviews = $('.reviews-card:visible'),
      visibleLenght = visibleReviews.length,
      reviewsCardLenght = $('.reviews-card').length ;

  visibleReviews.last().nextAll('.reviews-card').slice(0,visibleLenght).fadeIn(500);

  hideShowBtn();
});

// animation scroll
  APP.$document.on("click"," .js-scroll" , function (event) {
    event.preventDefault();
    
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    
    APP.$hamburger.removeClass('active');
    $('.header-content__menu.active').removeClass('active');
    $('body,html').animate({scrollTop: top}, 500);
  });

 APP.$document.on('scroll', function(){
   var windowScroll = $(window).height() + APP.$document.scrollTop(),
     element = APP.$document.find('.js-animation:not(.animate)')[0],
     elementOffset = 0;
     
  try{
    elementOffset = element.offsetTop + 200;
  }catch(e){
  }
   
  
  if(windowScroll >= elementOffset && elementOffset !== undefined){
    $('.js-animation:not(.animate)').first().addClass('animate');
  }
   
  });

});//document ready