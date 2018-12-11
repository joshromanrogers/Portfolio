// entry point
var referrer = document.referrer;

// grab elements
let intro = document.querySelector('.intro');
let subTitle = document.querySelector('.subtitle');
let head = document.querySelector('.letters');

// if coming from external source do animation, if not bring opacity of items to 1 (don't animate)
if(!(referrer.includes("romanrogers"))){
    // split every letter in text
    let splitIntro = intro.innerText.split('');
    let splitSubTitle = subTitle.innerText.split('');
    let splitLetters = head.innerText.split('');
    // remove text from title
    intro.innerHTML = '';
    subTitle.innerHTML = '';
    head.innerHTML = '';
    // wrap a span with class 'letter' around every letter and add back to title
    splitIntro.forEach((letter) => intro.innerHTML += `<span class="word">${letter}</span>`);
    splitSubTitle.forEach((letter) => subTitle.innerHTML += `<span class="word">${letter}</span>`);
    splitLetters.forEach((letter) => head.innerHTML += `<span class="word">${letter}</span>`);

    anime.timeline()
        // intro 'roman rogers' in
    .add({
        targets: '.intro .word',
        translateX: [200,0],
        translateY: [300,0],
        rotate: [360,0],
        opacity: [1,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: function(el, i) {
        return 300 + 30 * i;
        }
    })
        // intro 'roman rogers' out
    .add({
        targets: '.intro .word',
        translateX: [0,10],
        translateY: [0,-100],
        rotate: [0,-45],
        opacity: [1,1],
        easing: "easeInExpo",
        duration: 1200,
        delay: function(el, i) {
        return 300 + 0 * i *0;
        },
    })
        // title in
    .add({
        targets: '.title .letters .word',
        duration: 1000,
        delay: function(el, index) { return index*60; },
        easing: 'easeInQuart',
        opacity: 1,		
    })
        // subtitle in
    .add({
        targets: '.subtitle .word',
        duration: 1000,
        delay: function(el, index) { return index*30; },
        easing: 'easeInQuart',
        opacity: 1,	
    })
    .add({
        targets: '.work',
        duration: 1500,
        delay: 500,
        easing: 'linear',
        opacity: 1,
    })
    .add({
        targets: '.contact',
        duration: 1500,
        delay: 500,
        easing: 'linear',
        opacity: 1,
    })
    .add({
        targets: '.right',
        duration: 1500,
        easing: 'linear',
        opacity: 1,
    });
}
 else {
     document.querySelector('.work').style.opacity = "1";
     document.querySelector('.contact').style.opacity = "1";
     document.querySelector('.right').style.opacity = "1";
     intro.style.opacity = "0";
 };



// find position of mouse on page
let handleMousemove = (event) => {
    // responsive percentage position multiplied up to and rounded to equal an rgb number (0-255)
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    xAmount = Math.ceil(event.x / w * 255);
    yAmount = Math.ceil(event.y / h * 255);
    // update color on mouse movement
    subTitle.style.color = `rgb(0, ${xAmount},${yAmount})`;
};

let orientation = (event) => {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    xAmount = Math.ceil(event.alpha / w * 255);
    yAmount = Math.ceil(event.beta / h * 255);
    // update color on mouse movement

    subTitle.style.color = `rgb(0, ${xAmount},${yAmount})`;
}

window.addEventListener('deviceorientation', orientation);

// add event listeners
document.addEventListener('mousemove', handleMousemove);
