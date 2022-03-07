$(function(){
   
    
    
    $(".btn1").click(function(){
        $(".navbar").toggleClass("menu_active");
        $(".btn1 i").toggleClass("fa-bars");
        $(".btn1 i").toggleClass("fa-close");
        $(".btn1").toggleClass("btn_move");

    });
    
    
    
    $(".navbar-toggler").click(function(){
        $(".navbar-img").toggleClass("toggle");
    });
    
    
    
    
    
    
    
    
    
    
    
});