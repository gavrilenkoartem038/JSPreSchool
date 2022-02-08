let url = 'https://api.unsplash.com/search/photos?query=spring&orientation=landscape&per_page=30&client_id=Yi86mxHY1NYmZCkOJSbm7VGmEc3o4Ui3Fo5zxTzQ7us';
const gallery = document.querySelector('.gallery')
const input = document.querySelector('.input')
const images = document.querySelectorAll('.gallery-img')
const load = document.querySelector('.load')
let linkArr = []
const scaledImg = document.querySelector('.scaled-img')
const scaledImgContainer = document.querySelector('.scaled-img-container')
const closeBtn = document.querySelector('.close')
const changeBtn = document.querySelectorAll('[data-change]')
const imageNumber = document.querySelector('.image-number')
const imagesQuantity = document.querySelector('.images-quantity')
const closeSearch = document.querySelector('.close-search')

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    data.results.forEach(elem  => showData(elem))
    changeButton(data)
}
getData();

function showData (data) {
    const img = document.createElement('div');
    img.classList.add('gallery-img')
    img.style.backgroundImage = `url(${data.urls.regular})`;
    gallery.append(img);
    linkArr.push(data.urls.regular) 
}

function removeData() {
    const images = document.querySelectorAll('.gallery-img')
    images.forEach(img => img.remove())
    linkArr = []
}

let page = 2
function updateUrl () {
    removeData()
    const query = input.value
    url = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=30&client_id=Yi86mxHY1NYmZCkOJSbm7VGmEc3o4Ui3Fo5zxTzQ7us`;
    getData()
    page = 2
}

function loadMore () {
    const query = input.value
    url = `${url}&page=${page}`;
    getData()
    page++
}

function changeButton(data) {
    data.results.length < 30 ? load.textContent = 'No more images' : load.textContent = 'Load more...'
}

function showCurrent (e) {
    if(e.target.classList.contains('gallery-img')) {
        let currentImg =  e.target.style.backgroundImage
        let elem = linkArr.find(e => currentImg.includes(e))
        let index = linkArr.indexOf(elem)
        scaledImg.src = linkArr[index]
        imageNumber.textContent = `${index + 1}`
        scaledImgContainer.classList.add('open')
        imagesQuantity.textContent = linkArr.length
    }
}

function closeImg() {
    scaledImgContainer.classList.remove('open')
}

function changeImg () {
    let currentImg =  scaledImg.src
    let index = linkArr.indexOf(currentImg)
    index = index + parseInt(this.dataset.change)
    if (index < 0) index = linkArr.length - 1
    if (index > linkArr.length - 1) index = 0
    scaledImg.src = linkArr[index]
    imageNumber.textContent = `${index + 1}`
}

function searchClose () {
    input.value = ''
    closeSearch.classList.toggle('active')
}

input.addEventListener('keydown', e => e.key == 'Enter' && updateUrl(e))
load.addEventListener('click', loadMore)
gallery.addEventListener('click', showCurrent)
closeBtn.addEventListener('click', closeImg)
closeSearch.addEventListener('click', searchClose)
changeBtn.forEach(button => button.addEventListener('click', changeImg)) 

console.log('1.Вёрстка +10\n- на странице есть несколько фото и строка поиска +5\n- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. При загрузке приложения на странице отображаются полученные от API изображения +10\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n4. Поиск +30\n- при открытии приложения курсор находится в поле ввода +5\n- есть placeholder +5\n- автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n- поисковый запрос можно отправить нажатием клавиши Enter +5\n- после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n- в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n- можно загрузить дополнительные изображения, если они имеются\n- можно увеличить изображение кликнув на него, доступно перелистывание изображений.')