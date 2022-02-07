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
    console.log(index)
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
