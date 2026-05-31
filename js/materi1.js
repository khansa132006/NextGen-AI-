let currentSlide = 1;
const totalSlide = 3;

function updateSlide(){

    document
    .querySelectorAll('.slide')
    .forEach(slide=>{
        slide.classList.remove('active');
    });

    document
    .getElementById(`slide${currentSlide}`)
    .classList.add('active');

    document
    .querySelectorAll('.dot')
    .forEach(dot=>{
        dot.classList.remove('active');
    });

    document
    .querySelectorAll('.dot')
    [currentSlide - 1]
    .classList.add('active');
}

function nextSlide(){

    if(currentSlide < totalSlide){

        currentSlide++;
        updateSlide();

    }else{

        window.location.href = "materi2.html";

    }
}

function prevSlide(){

    if(currentSlide > 1){

        currentSlide--;
        updateSlide();

    }else{

        window.location.href = "materi.html";

    }
}