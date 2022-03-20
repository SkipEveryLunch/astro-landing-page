const slider = document.querySelector('.reviews');
const btns = document.querySelectorAll('.review-btn');
const reviews = [...document.querySelectorAll('.review')];
const indicators = [...document.querySelectorAll('.indicator')];
let isMoving;
let currentIndex = 1;
const showActiveIndicator = () => {
  indicators.forEach((el) => {
    el.classList.remove('active');
  });
  let activeIndicator;
  if (currentIndex === 0 || currentIndex === reviews.length - 2) {
    activeIndicator = indicators.length - 1;
  } else if (currentIndex === reviews.length - 1 || currentIndex === 1) {
    activeIndicator = 0;
  } else {
    activeIndicator = currentIndex - 1;
  }
  indicators[activeIndicator].classList.add('active');
};
const moveSlider = () => {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  showActiveIndicator();
};
const handleButtonClick = (e) => {
  if (isMoving) {
    return;
  }
  isMoving = true;
  if (e.currentTarget.id === 'next') {
    currentIndex++;
  } else {
    currentIndex--;
  }
  moveSlider();
  isMoving = false;
};
btns.forEach((btn) => {
  btn.addEventListener('click', handleButtonClick);
});
const handleIndicatorClick = (e) => {
  if (isMoving) {
    return;
  }
  isMoving = true;
  currentIndex = indicators.indexOf(e.target) + 1;
  moveSlider();
  isMoving = false;
};
indicators.forEach((ind) => {
  ind.addEventListener('click', handleIndicatorClick);
});
slider.addEventListener('transitionend', () => {
  isMoving = false;
  if (currentIndex === 0) {
    currentIndex = reviews.length - 2;
    slider.style.transitionDuration = '1ms';
    moveSlider();
  } else if (currentIndex === reviews.length - 1) {
    currentIndex = 1;
    slider.style.transitionDuration = '1ms';
    moveSlider();
  } else {
    slider.style.transitionDuration = '300ms';
  }
});
