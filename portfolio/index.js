
console.log('1.Смена изображений в секции portfolio +25\n2.Перевод страницы на два языка +25\n3.Переключение светлой и тёмной темы +25\nДополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\nДополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5\n Итого: 85 баллов')

const i18Obj = {
    'en': {
      'skills': 'Skills',
      'portfolio': 'Portfolio',
      'video': 'Video',
      'price': 'Price',
      'contacts': 'Contacts',
      'hero-title': 'Alexa Rise',
      'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
      'hire': 'Hire me',
      'skill-title-1': 'Digital photography',
      'skill-text-1': 'High-quality photos in the studio and on the nature',
      'skill-title-2': 'Video shooting',
      'skill-text-2': 'Capture your moments so that they always stay with you',
      'skill-title-3': 'Rotouch',
      'skill-text-3': 'I strive to make photography surpass reality',
      'skill-title-4': 'Audio',
      'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
      'winter': 'Winter',
      'spring': 'Spring',
      'summer': 'Summer',
      'autumn': 'Autumn',
      'price-description-1-span-1': 'One location',
      'price-description-1-span-2': '120 photos in color',
      'price-description-1-span-3': '12 photos in retouch',
      'price-description-1-span-4': 'Readiness 2-3 weeks',
      'price-description-1-span-5': 'Make up, visage',
      'price-description-2-span-1': 'One or two locations',
      'price-description-2-span-2': '200 photos in color',
      'price-description-2-span-3': '20 photos in retouch',
      'price-description-2-span-4': 'Readiness 1-2 weeks',
      'price-description-2-span-5': 'Make up, visage',
      'price-description-3-span-1': 'Three locations or more',
      'price-description-3-span-2': '300 photos in color',
      'price-description-3-span-3': '50 photos in retouch',
      'price-description-3-span-4': 'Readiness 1 week',
      'price-description-3-span-5': 'Make up, visage, hairstyle',
      'order': 'Order shooting',
      'contact-me': 'Contact me',
      'send-message': 'Send message',
      'email' : 'E-mail',
      'phone' : 'Phone',
      'message' : 'Message'
    },
    'ru': {
      'skills': 'Навыки',
      'portfolio': 'Портфолио',
      'video': 'Видео',
      'price': 'Цены',
      'contacts': 'Контакты',
      'hero-title': 'Алекса Райс',
      'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
      'hire': 'Пригласить',
      'skill-title-1': 'Фотография',
      'skill-text-1': 'Высококачественные фото в студии и на природе',
      'skill-title-2': 'Видеосъемка',
      'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
      'skill-title-3': 'Ретушь',
      'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
      'skill-title-4': 'Звук',
      'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
      'winter': 'Зима',
      'spring': 'Весна',
      'summer': 'Лето',
      'autumn': 'Осень',
      'price-description-1-span-1': 'Одна локация',
      'price-description-1-span-2': '120 цветных фото',
      'price-description-1-span-3': '12 отретушированных фото',
      'price-description-1-span-4': 'Готовность через 2-3 недели',
      'price-description-1-span-5': 'Макияж, визаж',
      'price-description-2-span-1': 'Одна-две локации',
      'price-description-2-span-2': '200 цветных фото',
      'price-description-2-span-3': '20 отретушированных фото',
      'price-description-2-span-4': 'Готовность через 1-2 недели',
      'price-description-2-span-5': 'Макияж, визаж',
      'price-description-3-span-1': 'Три локации и больше',
      'price-description-3-span-2': '300 цветных фото',
      'price-description-3-span-3': '50 отретушированных фото',
      'price-description-3-span-4': 'Готовность через 1 неделю',
      'price-description-3-span-5': 'Макияж, визаж, прическа',
      'order': 'Заказать съемку',
      'contact-me': 'Свяжитесь со мной',
      'send-message': 'Отправить',
      'email' : 'Почта',
      'phone' : 'Телефон',
      'message' : 'Сообщение'
    }
  }

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('lock');
});

nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.classList.remove('lock');
    }
});

const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(function preloadSummerImages(elem) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${elem}/${i}.jpg`;
  }
})

const portfolioBtns = document.querySelector('.portfolio-btns')
const portfolioImages = document.querySelectorAll('.portfolio-image')
const portfolioBtn = document.querySelectorAll('.black-btn')

function changeImage(event) {
  if(event.target.classList.contains('black-btn')) {
    portfolioImages.forEach(img => img.classList.add('slowChanges'));
    setTimeout(() => portfolioImages.forEach(img => img.classList.remove('slowChanges')), 1000); 
    setTimeout(() => portfolioImages.forEach((elem, index) => elem.src = `./assets/img/${event.target.dataset.i18}/${index + 1}.jpg`), 500); 
    
    portfolioBtn.forEach(elem => elem.classList.remove('active'))
    event.target.classList.toggle('active');
  }
}

portfolioBtns.addEventListener('click',  changeImage)

const language = document.querySelector('.language')
const themeChanger = document.querySelector('.theme')
let lang = 'en'
let theme = 0


function getTranslate(lang) {
  const text = document.querySelectorAll('[data-i18]')
  const box = document.querySelectorAll('.title-box')
  box.forEach(elem => elem.classList.add('slowChanges'));
  setTimeout(() => box.forEach(elem => elem.classList.remove('slowChanges')), 1000); 
  text.forEach(elem => elem.classList.add('slowChanges'));
  setTimeout(() => text.forEach(elem => elem.classList.remove('slowChanges')), 1000); 
  setTimeout(() => text.forEach(elem => elem.textContent = i18Obj[lang][elem.dataset.i18]), 500); 
  const placeholder = document.querySelectorAll('[placeholder]')
  setTimeout(() => placeholder.forEach(elem => {
    elem.placeholder = i18Obj[lang][elem.dataset.i18];
    elem.textContent = '';
  }), 500)
  document.querySelectorAll('.lang').forEach(n => n.classList.remove('checked'));
  for (let tag of language.children) {
    if (tag.id == lang) tag.classList.toggle('checked')
  }
} 

function getLightTheme() {
    const body = document.querySelectorAll('.main-container, .section-title, .title-box, .nav, .line')
    body.forEach(element => element.classList.toggle('light-theme')); 
    themeChanger.classList.toggle('sun')
} 

language.addEventListener('click',  e => {
    lang = e.target.id; 
    getTranslate(lang)
    localStorage.setItem('lang', lang);
})



themeChanger.addEventListener('click', e => {    
    getLightTheme()
    e.target.classList.contains('sun') ? theme = 1 : theme = 0
    localStorage.setItem('theme', theme);
})

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    } 
    let theme = localStorage.getItem('theme')
        if (theme == 1) getLightTheme()
}
window.addEventListener('load', getLocalStorage)


const button = document.querySelectorAll('.black-btn, .gold-btn')

button.forEach(elem => elem.addEventListener('click', function (e) {
  const x = e.offsetX
  const y = e.offsetY

  const circle = document.createElement('span')
  circle.classList.add('circle')
  circle.style.top = y + 'px'
  circle.style.left = x + 'px'

  this.appendChild(circle)

 setTimeout(() => circle.remove(), 500)
}))