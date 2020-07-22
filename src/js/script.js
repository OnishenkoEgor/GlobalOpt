'use strict';
window.addEventListener('DOMContentLoaded',()=>{

    


    ////slider
   const slides = document.querySelectorAll('.slide'),
    leftArrow = document.querySelector('.slide__arrow-left'),
    rightArrow = document.querySelector('.slide__arrow-right'),
    slider = document.querySelector('.slider');



    const totalSlides = slides.length;
    let current = 0;
    let slideContentList=[] ;
    slides.forEach((slide,index)=>{ 
        slideContentList[index] = slide.innerHTML;
        slide.remove();

    });

    function showSlide(index,e){
        if(e==undefined){
            let elem = document.createElement('div');
            elem.innerHTML = slideContentList[index];
            elem.classList.add('slide');
            slider.append(elem);
        }else if(e.target.parentNode.className==='slide__arrow-right'){
            
            let elem = document.createElement('div');
            elem.innerHTML = slideContentList[index];
            elem.classList.add('slide');
            slider.append(elem);
            elem.style.left='60%';
            elem.style.opacity='0';
            setTimeout(()=>{
                elem.style.left='50%';
                elem.style.opacity='1';
            },10);
        }else if(e.target.parentNode.className==='slide__arrow-left'){
            
            let elem = document.createElement('div');
            elem.innerHTML = slideContentList[index];
            elem.classList.add('slide');
            
            slider.append(elem);
            elem.style.left='40%';
            elem.style.opacity='0';
            setTimeout(()=>{
                elem.style.left='50%';
                elem.style.opacity='1';
            },10);
        }
    }
    showSlide(current);


    rightArrow.addEventListener  ('click',  (e)=>{
        if(current<totalSlides-1){
            current++;
        }else{
            current=0;
        }
        let slide = document.querySelector('.slide');
        slide.style.left='40%';
        slide.style.opacity = '0';
        setTimeout(()=>{
            slide.remove();
            
        },300);
        setTimeout(()=>{
            showSlide(current,e);
        },700); 
        
    });
    leftArrow.addEventListener  ('click',  (e)=>{
        if(current>0){
            current--;
        }else{
            current=2;
        }
        let slide = document.querySelector('.slide');
        slide.style.left='60%';
        slide.style.opacity = '0';
        setTimeout(()=>{
            slide.remove();
            
        },300);
        setTimeout(()=>{
            showSlide(current,e);
        },700); 
        
    });



////tabes
const tabButtons = document.querySelectorAll('.tab__btn');

tabButtons.forEach(tab=>{
    tab.addEventListener('click',e=>{
        
        const tabWrapper = e.target.parentNode.querySelector('.tab__wrapper');
        if(tabWrapper.classList.contains('tab__wrapper-active')){
            e.target.textContent='Подробнее';
        }else{
            e.target.textContent='Назад';
        }
        tabWrapper.classList.toggle('tab__wrapper-active');

    });
});



///////////////////////////////////////////////////////////////////////////////////////
//modal window 

const buttons = document.querySelectorAll('[data-recall="true"]'),
modal = document.querySelector('.modal');
modal.addEventListener('click',(e)=>{
    const target = e.target;
    if(target.classList.contains('modal')||target.classList.contains('close-form')){
        $(modal).fadeOut();
        document.body.style.overflow='';
    }
})
buttons.forEach(button=>{
    button.addEventListener('click',()=>{
        $(modal).fadeIn('slow');
        document.body.style.overflow='hidden';
    });
});

function checkForm(f){
    const inputs = f.querySelectorAll('input');
    inputs.forEach(inp=>{
        if(inp.value==''){
            
            showMessage('форма пуста');
        }else{
            showMessage('форма заполнена');
            $(modal).fadeOut();
        }
    });
}

const forms = document.querySelectorAll('form');
forms.forEach(form=>{
    formAction(form);
});



function formAction(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        checkForm(form);
        const formData = new FormData(form);
        
        $.ajax({
            type:"POST",
            url:"phpmailer/smart.php",
            data:$(form).serialize()
            
        })
        document.body.style.overflow='';
        form.reset();
    });
}


function showMessage(message){
    const msg = document.querySelector('.message');
        msg.textContent = message;
    msg.style.top='0';
    setTimeout(()=>{
        msg.style.top='-150px';
    },4000);
    
}
//////////////////////////////////////////////////////////////
//sending form



/////////////////////////////////////////////////////////////
    
const burgerMenu= document.querySelector('.nav__burger'),
navBlock = document.querySelector('nav'),
span = burgerMenu.querySelectorAll('span'),
navItem = document.querySelector('.nav__item'); 

navBlock.style.right='-75vw';
burgerMenu.addEventListener('click',toggleMenu);


//////scroll

const navItems = document.querySelectorAll('a[href*="#"]');


navItems.forEach(item=>{
    item.addEventListener('click',(e)=>{
        e.preventDefault();
        navBlock.style.right='-75vw';
        const id = item.getAttribute('href').substr(1);
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});



function toggleMenu(){
    if(navBlock.style.right.slice(0,1)=='-'||''){
        navBlock.style.right='10vw';
        span[0].style.marginTop ='14px';
        span[0].style.marginLeft = "1px";
        span[0].style.transform='Rotate(45deg)';
        span[1].style.opacity = '0';
        span[2].style.marginRight = '1px';
        span[2].style.transform='Rotate(-45deg)';
        span[2].style.marginBottom ='14px';
    }else{
        span[0].style.transform='Rotate(0)';
        span[0].style.marginTop = "0";
        span[1].style.opacity = '1';
        span[2].style.transform='Rotate(0)';
        span[2].style.marginBottom = "0";
        navBlock.style.right='-75vw';
    }
}

//end    
});
window.addEventListener('scroll',()=>{
    const link = document.querySelector('.to-top');
    if(window.pageYOffset>680){
        link.style.right = '30px';
    }else{
        link.style.right = '-50px';
    }
});






jQuery(function($){
$('input[name=phone]').mask("+7(999)999-99-99");
});