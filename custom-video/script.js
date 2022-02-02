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