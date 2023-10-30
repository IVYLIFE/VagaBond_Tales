console.log('main.js loaded');

// ===================== Classes ===================== //

class Sprite {
    constructor({ position, imgSrc, animate = false, maxFrame = 1, scale = 1, frameHold }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc
        this.scale = scale;
        this.animate = animate;
        this.maxFrame = maxFrame;
        this.currentFrame = 0;
        this.frameElapsed = 0;
        this.frameHold = frameHold;
        this.frameWidth = this.image.width / this.maxFrame;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frameWidth * this.currentFrame,
            0,
            this.frameWidth,
            this.image.height,
            this.position.x,
            this.position.y,
            this.frameWidth * this.scale,
            this.image.height * this.scale,
        );
    }

    update() {
        this.draw();
        this.frameElapsed++;

        if (this.frameElapsed % this.frameHold == 0) {
            if (this.currentFrame < this.maxFrame - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }
}


class Player {
    constructor({ position, velocity , attackOffset, color = 'blue'}) {
        this.position = position;                  // store the position of the player
        this.velocity = velocity;                  // store the velocity of the player

        this.width = 35;                           // store the width of the player
        this.height = 160;                         // store the height of the player
        this.health = 100;                         // store the health of the player

        this.attackOffset = attackOffset;          // store the attackOffset of the player [ 1 => Right, -1 => Left]
        this.color = color;                        // store the color of the player

        this.attackBox = {
            width: 100,
            height: 25,
            position: {
                x : this.position.x,
                y : this.position.y
            }
        }
        
        this.isAttacking;                          // checks if the player is attacking or not
        this.doubleJump = false;                   // checks if the player can double jump or not

        this.lastMove;                             // store the last move in horizontal direction
        this.move_H = [];                          // store the last two horizontal moves
        this.jumpCount = 0;                        // store the number of jumps
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = (this.attackOffset === 1) ? this.position.x  : this.position.x - this.attackBox.width + this.width;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        if (Math.floor(this.position.y + this.height + this.velocity.y) > landingHeight) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
            this.position.y += this.velocity.y;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

}


// Canvas 

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1400;
canvas.height = 785;


// =================================================== //
// =================================================== //
// =================================================== //





// ==================== Variables ==================== //

const keys = {
    a: { pressed: false },
    d: { pressed: false },

    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};

const landingHeight = canvas.height - 130;
const velocity_X = 2.5;
const velocity_Y = 8.5;
const gravity = 0.2;

let gameDuration = 1000;
let countDownId;
let isGameStarted = false;
let showPlayers = false;
let animationId;

// =================================================== //
// =================================================== //
// =================================================== //






// =================== DOM Element =================== //

const startGameButton = document.querySelector('#startGame');
const playAgainButton = document.querySelector('#playAgain');

const gameStatus = document.querySelector('.gameStatus');
const playersName = document.querySelector('.playersName');
const clock = document.querySelector('#clock');

const gameOption = document.querySelector('.gameOption');
const startMessage = document.querySelector('#startGameMessage');
const endMessage = document.querySelector('#endGameMessage');
const result = document.querySelector('#result')

const player1Health = document.querySelector('#player1 .healthBar');
const player2Health = document.querySelector('#player2 .healthBar');

// =================================================== //
// =================================================== //
// =================================================== //



// ================== Game Elements ================== //

const backGroundSprite = new Sprite({
    position: { x: 0, y: 0 },
    imgSrc: './assets/background.png',
    animate: false,
})

const shopSprite = new Sprite({
    position: { x: 880, y: landingHeight - 445 },
    imgSrc: './assets/shop.png',
    animate: true,
    maxFrame: 6,
    scale: 3.5,
    frameHold: 25,
})


const player1 = new Player(
    {
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 },
        attackOffset: 1,
    }
);

const player2 = new Player(
    {
        position: { x: 750, y: 0 },
        velocity: { x: 0, y: 0 },
        attackOffset: -1,
        color: 'cyan'
    }
);

console.log(player1);
console.log(player2);

// =================================================== //
// =================================================== //
// =================================================== //




// =================== Game Logic ==================== //

const handleKeyDown = (event) => {
    console.log(event.key);

    switch (event.key) {


        // ======================== Player One ========================

        case 'a':
        case 'A':
            keys.a.pressed = true;

            if (player1.lastMove !== 'a') {
                player1.move_H.push('a');
            }

            player1.lastMove = 'a';
            break;

        case 'd':
        case 'D':
            keys.d.pressed = true;

            if (player1.lastMove !== 'd') {
                player1.move_H.push('d');
            }

            player1.lastMove = 'd';
            break;

        case 'w':
        case 'W':
            player1.jumpCount++;
            if (player1.jumpCount <= 2) {
                player1.velocity.y = -velocity_Y;
            }
            break;

        case ' ':
            player1.attack();
            // if( !(player1.isAttacking) ){
            // player1.isAttacking = true;
            // player1.attack();
            // }
            break;



        // ======================== Player Two ======================== 

        case 'ArrowLeft':
        case '4':
            keys.ArrowLeft.pressed = true;

            if (player2.lastMove !== 'ArrowLeft') {
                player2.move_H.push('ArrowLeft');
            }

            player2.lastMove = 'ArrowLeft';
            break;

        case 'ArrowRight':
        case '6':
            keys.ArrowRight.pressed = true;

            if (player2.lastMove !== 'ArrowRight') {
                player2.move_H.push('ArrowRight');
            }

            player2.lastMove = 'ArrowRight';
            break;

        case 'ArrowUp':
        case '8':
            player2.jumpCount++;
            if (player2.jumpCount <= 2) {
                player2.velocity.y = -velocity_Y;
            }
            break;

        case 'k':
        case 'K':
        case 'ArrowDown':
        case '5':
            player2.isAttacking = true;
            player2.attack();
            break;


    }
}

const handleKeyUp = (event) => {
    switch (event.key) {
        // ======================== Player One ========================

        case 'a':
        case 'A':
            keys.a.pressed = false;
            player1.move_H.pop();

            if (player1.move_H.length != 0) {
                player1.lastMove = 'd';
                keys.d.pressed = true;
            }

            break;

        case 'd':
        case 'D':
            keys.d.pressed = false;
            player1.move_H.pop();

            if (player1.move_H.length != 0) {
                player1.lastMove = 'a'
                keys.a.pressed = true;
            }

            break;


        case ' ':
            player1.isAttacking = false;
            break;


        // ======================== Player Two ========================

        case 'ArrowLeft':
        case '4':
            keys.ArrowLeft.pressed = false;
            player2.move_H.pop();

            if (player2.move_H.length != 0) {
                player2.lastMove = 'ArrowRight';
                keys.ArrowRight.pressed = true;
            }

            break;

        case 'ArrowRight':
        case '6':
            keys.ArrowRight.pressed = false;
            player2.move_H.pop();

            if (player2.move_H.length != 0) {
                player2.lastMove = 'ArrowLeft';
                keys.ArrowLeft.pressed = true;
            }
            break;

        case 'k':
        case 'K':
        case 'ArrowDown':
        case '5':
            player2.isAttacking = false;
            break;

    }
}

const collision = ({ player, enemy }) => {

    return (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height)

}

const changeAttackDirection = ({ player, enemy }) => {
    if (player.position.x > enemy.position.x + enemy.width) {
        player.attackOffset = -1;             // Attack in Left Direction
    } else {
        player.attackOffset = 1;              // Attack in Right Direction
    }
}

const playerStanding = (player) => {
    if (Math.floor(player.velocity.y + player.position.y + player.height) == landingHeight) {
        player.jumpCount = 0;
    }
}

const countDown = () => {
    if (isGameStarted) {
        clock.textContent = gameDuration;

        if (gameDuration <= 0) {
            gameOver({ player: player1, enemy: player2, countDownId });
        } else {
            gameDuration--;
            countDownId = setTimeout(countDown, 1000);
        }
    }
}

const gameStart = () => {
    startMessage.classList.add('hidden');
    gameStatus.classList.remove('hidden');
    playersName.classList.remove('hidden');

    player1Health.style.width = `${player1.health}%`;
    player2Health.style.width = `${player2.health}%`;

    isGameStarted = true;
    showPlayers = true

    countDown();
    startAnimation();
}

const gameOver = ({ player, enemy, countDownId }) => {
    isGameStarted = false;
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    clearTimeout(countDownId);
    cancelAnimationFrame(animationId);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);

    if (player.health > enemy.health) {
        result.textContent = 'Player One Wins';
    } else if (player.health < enemy.health) {
        result.textContent = 'Player Two Wins';
    } else {
        result.textContent = 'Draw';
    }
    endMessage.classList.remove('hidden')
} 

const startAnimation = () => {

    function updateGame() {
        // Update player positions, check collisions, handle game logic, etc.
        if (isGameStarted) {
            player1.velocity.x = 0;
            player2.velocity.x = 0;

            // ================================== player1 ==================================
            if (keys.d.pressed && player1.lastMove === 'd' && player1.position.x + player1.width < canvas.width) {
                player1.velocity.x = velocity_X;
            }

            if (keys.a.pressed && player1.lastMove === 'a' && player1.position.x > 0) {
                player1.velocity.x = -velocity_X;
            }

            if (player1.isAttacking && collision({ player: player1, enemy: player2 })) {
                player1.isAttacking = false;
                player2.health -= 10;
                player2Health.style.width = `${player2.health}%`;
            }


            // ================================== player2 ==================================
            if (keys.ArrowRight.pressed && player2.lastMove === 'ArrowRight' && player2.position.x + player2.width < canvas.width) {
                player2.velocity.x = velocity_X;
            }

            if (keys.ArrowLeft.pressed && player2.lastMove === 'ArrowLeft' && player2.position.x > 0) {
                player2.velocity.x = -velocity_X;
            }

            if (player2.isAttacking && collision({ player: player2, enemy: player1 })) {
                player2.isAttacking = false;
                player1.health -= 10;
                player1Health.style.width = `${player1.health}%`;
            }


            playerStanding(player1);     // Player1 Standing
            changeAttackDirection({ player: player1, enemy: player2 });

            playerStanding(player2);        // Player2 Standing
            changeAttackDirection({ player: player2, enemy: player1 });


            // ================================== Game Over ==================================
            if (player1.health <= 0 || player2.health <= 0) {
                gameOver({ player: player1, enemy: player2, countDownId });
                return;
            }
        }
    }

    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        backGroundSprite.update();
        shopSprite.update();
        
        if(showPlayers){
            player1.update();
            player2.update();
        }


        // Continue the game loop
        animationId = requestAnimationFrame(() => {
            updateGame();
            renderGame();
        });
    }

    renderGame();
}

window.onload = function () {
    startAnimation();
}

// =================================================== //
// =================================================== //
// =================================================== //



// ================= Event Listeners ================= //

startGameButton.addEventListener('click', gameStart)
playAgainButton.addEventListener('click', () => {
    window.location.reload();
    showPlayers = false
})

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

