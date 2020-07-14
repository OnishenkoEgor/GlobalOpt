'use strict';
window.addEventListener('DOMContentLoaded',()=>{
    const slideList = document.querySelectorAll('.slide'),
        leftArrow = document.querySelector('.slide__arrow-left'),
        rightArrow = document.querySelector('.slide__arrow-right');
    let currientSlide;
    console.dir(slideList[0].classList);
    function showSlide(i=0){
        slideList[i].classList.add('active');   
    }
    function hiddenSlides(){
        slideList.forEach((item)=>{
            item.classList.remove('active');
        });
    }
    showSlide();
    rightArrow.addEventListener('click',()=>{
        if(currientSlide<2){
            currientSlide++;
            hiddenSlides();
            showSlide(currientSlide);
            
        }else{
            currientSlide=0;
            hiddenSlides();
            showSlide(currientSlide);
        } 
    });
    leftArrow.addEventListener('click',()=>{
        if(currientSlide>0){
            currientSlide--;
            hiddenSlides();
            showSlide(currientSlide);
            
        }else{
            currientSlide=3;
            hiddenSlides();
            showSlide(currientSlide);
        } 
    });
});