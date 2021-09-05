//Game variables and constant
velocityState = { x: 0, y: 0 };
const playSound = new Audio('playing.mp3');
const foodSound = new Audio('food.mp3');
const lostSound = new Audio('lost_game.mp3');
const moveSound = new Audio('moving.mp3');
const speed = 10;
const gridX = 24;
const gridY = 24;
snake = [
    { x: 0, y: 5 }
];
last_load = 0;
snake_food = { x: 20, y: 17 };
score = 0;


// Score block
scoreBlock = document.getElementById("score");
scoreBlock.innerHTML ="Score: "+ score;

//setting up the HIGHSCORE;
let HiScore = localStorage.getItem("HiScore");
if(HiScore==null)
{
    highScore =0;
}
else{
    highScore = JSON.parse(HiScore);
}



// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - last_load) / 1000 < 1 / speed) {
        return;
    }
    last_load = ctime;
    snakeGame();
}

function GameOver() {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    if (snake[0].x >gridX || snake[0].x < 0 || snake[0].y > gridY || snake[0].y < 0)
    return true;

    else false;

}

function snakeGame() {

    board = document.getElementById('board');
    board.innerHTML = "";

    if(GameOver()){
        velocityState.x=0;
        velocityState.y=0;
        playSound.pause();
        console.log(score,highScore);
        if(score>=highScore){
            console.log("s>HS");
            highScore=score;
            //Display High Score
            localStorage.setItem("HiScore",JSON.stringify(highScore));
            alert("Congratulations! You have acheived the highest score.");
        }
        lostSound.play();
        alert("Game Over! Press key to play again");
        score=0;
        snake = [{x:5,y:5}];
        snake_food={ x: 20, y: 17 };
        
        
    }

    //1. snake_declaration
    snake.forEach((element, index) => {
        var snakeBody = document.createElement('div');
        snakeBody.style.gridColumnStart = element.x;
        snakeBody.style.gridRowStart = element.y;
        if (index === 0) {
            snakeBody.classList.add('snakeHead');
        }
        else {
            snakeBody.classList.add('snakePart');
        }
        board.appendChild(snakeBody);
    });

    //2.eat food
    if ((snake[0].x === snake_food.x) && (snake[0].y === snake_food.y)) {
        console.log("cooord matched");
        score = score+ 1;
        //updating score value
        scoreBlock = document.getElementById("score");
        scoreBlock.innerHTML ="Score: "+ score;
        foodSound.play();
        snake.unshift({ x: snake[0].x + velocityState.x, y: snake[0].y + velocityState.y });
        // Food Decleration
        snake_food.x = Math.round(Math.random()*(gridX-2)+1);
        snake_food.y = Math.round(Math.random()*(gridY-2)+1);

    }

    document.getElementById('highScore').innerHTML="Highest Score : "+ highScore;

    // Display the food
    var F = document.createElement('div');
    F.style.gridColumnStart = snake_food.x;
    F.style.gridRowStart = snake_food.y;
    F.classList.add('Food');
    board.appendChild(F);

    //3.Move the snake
    for (i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    snake[0].x = snake[0].x + velocityState.x;
    snake[0].y = snake[0].y + velocityState.y;


    console.log(snake[0].x, snake[0].y, snake_food.x, snake_food.y);
}




window.addEventListener('keydown', e => {
    velocityState.x = 1;
    velocityState.y = 0;//started the game.
    playSound.play();
    switch (e.key) {
        case "ArrowUp":
            velocityState.x = 0;
            velocityState.y = -1;
            break;
        case "ArrowDown":
            velocityState.x = 0;
            velocityState.y = 1;
            break;
        case "ArrowLeft":
            velocityState.x = -1;
            velocityState.y = 0;
            break;
        case "ArrowRight":
            velocityState.x = 1;
            velocityState.y = 0;
            break;
        default:
            break;
    }
})



window.requestAnimationFrame(main);

// javascript Clock

hours=document.getElementsByClassName('hr')[0];
minutes =document.getElementsByClassName('min')[0];
seconds =document.getElementsByClassName('sec')[0];
setInterval(()=>{
    d =new Date();
    htime=d.getHours();
    mtime=d.getMinutes();
    stime=d.getSeconds();
    hrot = 180+30*htime + mtime/2;
    mrot= 180+6*mtime;
    srot = 180+ 6*stime;

    hours.style.transform = `rotate(${hrot}deg)`;
    minutes.style.transform = `rotate(${mrot}deg)`;
    seconds.style.transform = `rotate(${srot}deg)`;

},1000)