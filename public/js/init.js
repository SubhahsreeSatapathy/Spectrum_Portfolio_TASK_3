const swiper = new Swiper('.swiper-container', {
  speed: 400,
  spaceBetween: 10,
  slidesPerView: 1,
  breakpoints: {
    '@0.75': {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    '@1.00': {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    '@1.25': {
      slidesPerView: 2.5,
      spaceBetween: 40,
    },
    '@1.50': {
      slidesPerView: 3.2,
      spaceBetween: 50,
    },
  }
});


const closeMsg = document.querySelector('#closeMsg');
const msg = document.querySelector('.msg');

closeMsg.addEventListener('click', () => {
  msg.style.display = "none";
})

