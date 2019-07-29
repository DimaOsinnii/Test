let slider = $('.slide-content');
$(document).ready(function(){
  $('.slide-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    fade: true,
    speed: 1000,
    arrows: false
  });
});
