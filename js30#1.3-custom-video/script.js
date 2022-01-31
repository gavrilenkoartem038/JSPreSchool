const video = document.querySelector('.video');
const playIcon = document.querySelector('.play-icon')
const playBtn  = document.querySelector('.play-btn')
const volume = document.querySelector('.volume')
const progress = document.querySelector('.progress')

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function changeIcon () {
    const icon = this.paused ? 'play' : 'pause'
    playIcon.style.backgroundImage = `url(./assets/svg/${icon}.svg)`
    playBtn.classList.toggle('none')
}

function updateVolume () {
    video[this.name] = this.value
}

function updateProgress () {
    const time =  video.currentTime / video.duration * 100
    progress.value = `${time}`
}

function scrab(e) {
    const scrabTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrabTime
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', changeIcon)
video.addEventListener('pause', changeIcon)
video.addEventListener('timeupdate', updateProgress)
playIcon.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
volume.addEventListener('change', updateVolume)
volume.addEventListener('mousemove', updateVolume)
progress.addEventListener('click', scrab)

