const canvas = document.querySelector('.game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'assets/ground.png'

const foodImg = new Image()
foodImg.src = 'assets/prawn.png'

const scoreItem = document.querySelectorAll('.score')
const scoresBox = document.querySelector('.scores-box')
let box = 32;
let score = 0;
let scores = []
if(localStorage.scores != null) scores = getLocalStorage(scores)
writeScores(scores)

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let snakeX = snake[0].x
let snakeY = snake[0].y

let interval = 300
let points = 1
const btnContainer = document.querySelector('.btn-container')
const levelBtns = document.querySelectorAll('.level-btn')

function selectLevel(event) {
    if(event.target.classList.contains('level-btn')) {
        levelBtns.forEach(e => e.classList.remove('active'))
        event.target.classList.add('active')
        points = parseInt(event.target.dataset.points) 
        interval = event.target.dataset.interval
        clearInterval(game)
        game = setInterval(playGame, interval);
    }
}

btnContainer.addEventListener('click', selectLevel)

function setLocalStorage(arr) {
    localStorage.setItem('scores', arr)
}

function getLocalStorage(arr) {
    arr = localStorage.getItem('scores').split(',')
    return arr
}

function writeScores(arr) {
    let sortedArr = arr.slice().sort((a, b) => b - a) 
    sortedArr.forEach((elem, index) => {
        scoreItem[index].children[1].textContent = `${elem} points`
    })
}

function setScores () { 
    if(scores.length < 10) {
        console.log(scores.length)
        scores.push(score)
    } else {
        scores.shift()
        scores.push(score)
        console.log(scores)
    }
    setLocalStorage(scores)
    writeScores(scores)
}

document.addEventListener('keydown', setDirection)

let dir

function setDirection(event) {
    if (canvas.classList.contains('active')){
        if (event.keyCode == 37 && dir != 'right') dir = 'left'
    else if (event.keyCode == 38 && dir != 'down') dir = 'up'
    else if (event.keyCode == 39 && dir != 'left') dir = 'right'
    else if (event.keyCode == 40 && dir != 'up') dir = 'down'
    }
    
}

const gameEnd = document.querySelector('.end-game')
const tryAgain = document.querySelector('.try-again')
const menuBack = document.querySelector('.menu-back')

function endGame (head, arr) {
    let end = false
    for(let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            end = true
        }
    }
    if(head.x < box || head.x > box * 17 || head.y < box * 3 || head.y > box * 17) {
        end = true
    }
    if(end == true) {
        clearInterval(game)
        gameEnd.classList.add('active')
        gameEnd.children[0].textContent = `Your score: ${score} point(s)`
        setScores()
    }
}

function afterGame () {
    snake = []
    snake[0] = {
    x: 9 * box,
    y: 10 * box
    }
    snakeX = snake[0].x
    snakeY = snake[0].y
    dir = ''
    score = 0
    game = setInterval(playGame, interval);
}

tryAgain.addEventListener('click', () => {
    afterGame()
    gameEnd.classList.remove('active')
})

menuBack.addEventListener('click', () => {
    afterGame()
    gameEnd.classList.remove('active')
    canvas.classList.remove('active')
    menu.classList.remove('hidden')
})

function drawGame() {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)

    snake.forEach((elem,index) => {
        ctx.fillStyle = `rgb(0, ${128 +index*2}, 0)`;
        ctx.fillRect(elem.x + 3, elem.y + 3, box-6, box-6)
    })

    ctx.fillStyle = 'white'
    ctx.font = '32px Exo'
    ctx.fillText(score, box * 2.2, box * 1.5)
}

const audio = document.querySelector('.audio')

function eatFood () {
    if(snakeX == food.x && snakeY == food.y) {
        audio.play()
        score += points
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop()
    }
}

function moveSnake() {

}

function playGame() {
    drawGame()
    eatFood()
    
    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    endGame(newHead, snake)
    snake.unshift(newHead)
}

const play = document.querySelector('.play')
const menu = document.querySelector('.container')

function startGame () {
    canvas.classList.add('active')
    menu.classList.add('hidden')
}

play.addEventListener('click', startGame)

let game = setInterval(playGame, interval);