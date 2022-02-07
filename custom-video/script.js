console.log('Вёрстка +10\nвёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5\nв футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\nКнопка Play/Pause на панели управления +10\nпри клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5\nвнешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5\nПрогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10\nПри перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10\nПри клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10\nКнопка Play/Pause в центре видео +10\nесть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5\nкогда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\nДобавлены скачки на 10 секунд вперед и назад, изменение скорости воспроизведения, возможность открыть видео во весь экран\n Итого: 70.'
)

const video = document.querySelector('.video');
const playIcon = document.querySelector('.play-icon')
const volumeIcon = document.querySelector('.volume-icon')
const playBtn  = document.querySelector('.play-btn')
const volume = document.querySelector('.volume')
const volumeValue = document.querySelector('.volume-value')
const progress = document.querySelector('.progress')
const fullscreen = document.querySelector('.fullscreen-icon')
const videoPlayer = document.querySelector('.player-container')
const background = document.querySelector('.background')
const speed = document.querySelector('.speed')
const speedValue = document.querySelector('.speed-value')
const speedIcon = document.querySelector('.speed-icon')
const skipIcons = document.querySelectorAll('[data-skip]')
const controls = document.querySelector('.controls')

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    if (background.style.zIndex != '0') {
        background.style.opacity = '0';
        background.style.zIndex = '0';
    }
}

function changeIcon () {
    const icon = this.paused ? 'play' : 'pause'
    playIcon.style.backgroundImage = `url(./assets/svg/${icon}.svg)`
    playBtn.classList.toggle('none')
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateVolume () {
    video['volume'] = volume.value
    volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume.value * 100}%, rgba(0, 0, 0, 0.5) ${volume.value * 100}%, rgba(0, 0, 0, 0.5) 100%)`
    volume.value == 0 ? volumeIcon.style.backgroundImage = `url(./assets/svg/volume-off.svg)` : volumeIcon.style.backgroundImage = `url(./assets/svg/volume-on.svg)`
    volumeValue.textContent = `${Math.round(volume.value * 100)}%`
}

function muteVolume () {
    if (volume.value == 0) {
        volume.value = 0.5;
        updateVolume()
    } else {
        volume.value = 0;
        updateVolume()
    }
}

function updateProgress () {
    const time =  video.currentTime / video.duration * 100
    progress.value = `${time}`;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${time}%, rgba(0, 0, 0, 0.5) ${time}%, rgba(0, 0, 0, 0.5) 100%)`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    console.log(e)
    video.currentTime = scrubTime;
    
}

function speedChange () {
    video['playbackRate'] = speed.value
    speed.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${speed.value * 100 -50}%, rgba(0, 0, 0, 0.5) ${speed.value * 100 - 50}%, rgba(0, 0, 0, 0.5) 100%)`
    speedValue.textContent = `${speed.value}x`
}

function normalizeSpeed () {
    speed.value = 1.0;
    speedChange()
}

function toggleFullscreen () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoPlayer.requestFullscreen();
    }  
}

let mousedown = false

video.addEventListener('click', togglePlay);
video.addEventListener('play', changeIcon)
video.addEventListener('pause', changeIcon)
video.addEventListener('timeupdate', updateProgress)
playIcon.addEventListener('click', togglePlay);
background.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
volumeIcon.addEventListener('click', muteVolume);
volume.addEventListener('change', updateVolume)
volume.addEventListener('mousemove', updateVolume)
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => {mousedown = true; console.log(mousedown)});
progress.addEventListener('mouseup', () => {mousedown = false; console.log(mousedown)});
speed.addEventListener('change', speedChange)
speed.addEventListener('mousemove', speedChange)
speedIcon.addEventListener('click', normalizeSpeed);
fullscreen.addEventListener('click', toggleFullscreen)
skipIcons.forEach(icon => icon.addEventListener('click', skip))