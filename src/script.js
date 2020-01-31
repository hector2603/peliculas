
$(document).ready(function() {
    $("#input-20").fileinput({
        browseClass: "btn btn-primary btn-block",
        maxFileCount: 1,
        dropZoneEnabled: false,
        allowedFileTypes: ["image"],
    });
});


var scaling = 1.2;
//count
var currentSliderCount = 0;
var videoCount = $(".slider-container").children().length;
var showCount = 4;
var sliderCount = videoCount / showCount;
var controlsWidth = 40;
var scollWidth = 0;
    

$(document).ready(function(){
    //$('.slider-container .slide:nth-last-child(-n+4)').prependTo('.slider-container');
    init();
    
});
$( window ).resize(function() {
    init();
});
function init(){
    // elements
    videoCount = $(".slider-container").children().length;
    sliderCount = videoCount / showCount;
    
    var win = $(window);
    var sliderFrame = $(".slider-frame");
    var sliderContainer = $(".slider-container");
    var slide = $(".slide");
    var imagen = $(".img-slide");
    
    //counts
    //var scollWidth = 0;
 
    
    //sizes
    var windowWidth = win.width();
    var frameWidth = win.width() - 80;
     if(windowWidth >= 0 && windowWidth <= 414){
       showCount = 2;
   }else if(windowWidth >= 414 &&  windowWidth <= 768){
       showCount = 3;
   }else{
       showCount = 4;
   }
    var videoWidth = ((windowWidth - controlsWidth * 2) / showCount );
    var videoHeight = Math.round(videoWidth / (16/9));
    
    var videoWidthDiff = (videoWidth * scaling) - videoWidth;
    var videoHeightDiff = (videoHeight * scaling) - videoHeight;
    
  
    
    //set sizes
    sliderFrame.width(windowWidth);
    sliderFrame.height(videoHeight * scaling);
    
    
    //sliderFrame.css("top", (videoHeightDiff / 2));
    
    sliderContainer.height(videoHeight * scaling);
    sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
    sliderContainer.css("top", (videoHeightDiff / 2));
    sliderContainer.css("margin-left", (controlsWidth));
    
    slide.height(videoHeight);
    slide.width(videoWidth);
    imagen.height(videoHeight);
    
    //hover effect
    $(".slide").mouseover(function() {
        var posicion_slide = $(this).parent().children().index($(this));
        var img = $($($(this).children()[0])).children();
        img.css("height", videoHeight * scaling)
        $(this).css("width", videoWidth * scaling);
        $(this).css("height", videoHeight * scaling);
        $(this).css("top", -(videoHeightDiff / 2));
        if(posicion_slide == 0 || (posicion_slide) % 4 == 0){
          // do nothing
        }
        else if((posicion_slide + 1) % 4 == 0 && posicion_slide != 0){
            $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
        }
        else{
            $(this).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }).mouseout(function() {
        var img =  $($($(this).children()[0])).children();
        img.css("height", videoHeight * 1);
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);
    });
    
    // controls
    //controls(frameWidth, scollWidth);
}
function controls( categoria){
    //console.log("llamado de: "+categoria);
    var prev = $("#"+categoria+"-btn-prev");
    var next = $("#"+categoria+"-btn-next");
    var win = $(window);
    var frameWidth = $(window).width() - 80;
    
    next.on("click", function(){
        scollWidth = (parseInt($('#'+categoria+'container').attr('title'))+1)*($(window).width() - 80);
        $('#'+categoria+'container').animate({
            left: - scollWidth
        }, 300, function(){
            //console.log("current:  "+(parseInt($(this).attr('title'))+1)*frameWidth ); 
            //console.log(scollWidth);
            if(parseInt($(this).attr('title')) >= (($(this).children().length)/showCount)-1){
                $(this).css("left", 0);
                $(this).attr('title',0);
                scollWidth = 0;
            }else{
                $(this).attr('title',(parseInt($(this).attr('title'))+1));
            }
        });        
    });
    prev.on("click", function(){
        //console.log((parseInt($('#'+categoria+'container').attr('title'))*frameWidth));
        if(parseInt($('#'+categoria+'container').attr('title'))>0){
            scollWidth =  (parseInt($('#'+categoria+'container').attr('title'))*($(window).width() - 80) - ($(window).width() - 80)) ;
            $('#'+categoria+'container').animate({
                left: - scollWidth
            }, 300, function(){
                //console.log("current:  "+(parseInt($('#'+categoria+'container').attr('title'))-1)*frameWidth); 
                //console.log(scollWidth); 
                $(this).attr('title',(parseInt($(this).attr('title'))-1));
            });
        }
    });
};


