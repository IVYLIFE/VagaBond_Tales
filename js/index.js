console.log('index.js loaded');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1400;
canvas.height = 785;


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


const gameOption = document.querySelector('.gameOption');
const startGameButton = document.querySelector('#startGame');
const playAgainButton = document.querySelector('#playAgain');

const imageSources = ['./assets/background.png', './assets/shop.png', 'assets/Miyamoto Mushashi/Idle.png']; // List of image sources
const images = {};


function preloadImages(sources) {
  sources.forEach(source => {
    const image = new Image();
    image.src = source;
    images[source] = image;
  });
}

preloadImages(imageSources);
console.log(images)

// =================================================== //
// =================================================== //
// =================================================== //




// =================== Game Elements ================= //

const backGroundSprite = new Sprite({
    position: { x: 0, y: 0 },
    imgSrc: './assets/background.png',
    animate: false,
})

const shopSprite = new Sprite({
    position: { x: 880, y: landingHeight - 445 },
    imgSrc: './assets/shop.png',
    animate: true,
    scale: 3.5,
    maxFrames: 6,
    frameHold: 25,
})


const player1 = new Player(
    {
        position: { x: 100, y: 0 },
        spriteOffset: {
            x: 180,
            y: 145,
        },
        imgSrc: 'assets/Miyamoto Mushashi/Idle.png',
        animate: true,
        scale: 2.5,
        maxFrames: 8,
        frameHold: 10,
        velocity: { x: 0, y: 0 },
        attackOffset: 1,
        playerOffset: 1,
        sprites: {
            idle: {
              imageSrc: './assets/Miyamoto Mushashi/Idle.png',
              maxFrames: 8
            },
            run: {
              imageSrc: './assets/Miyamoto Mushashi/Run.png',
              maxFrames: 8
            },
            jump: {
              imageSrc: './assets/Miyamoto Mushashi/Jump.png',
              maxFrames: 2
            },
            fall: {
              imageSrc: './assets/Miyamoto Mushashi/Fall.png',
              maxFrames: 2
            },
            attack1: {
              imageSrc: './assets/Miyamoto Mushashi/Attack1.png',
              maxFrames: 6
            },
            takeHit: {
              imageSrc: './assets/Miyamoto Mushashi/Take Hit - white silhouette.png',
              maxFrames: 4
            },
            death: {
              imageSrc: './assets/Miyamoto Mushashi/Death.png',
              maxFrames: 6
            }
        },
    }
);

const player2 = new Player(
    {
        position: { x: 800, y: 0 },
        spriteOffset: {
            x: 180,
            y: 155,
        },
        imgSrc: 'assets/Kojiro Sasaki/Idle.png',
        animate: true,
        scale: 2.5,
        maxFrames: 4,
        frameHold: 15,
        velocity: { x: 0, y: 0 },
        attackOffset: -1,
        playerOffset: -1,
        color: 'cyan',
        sprites: {
            idle: {
              imageSrc: './assets/Kojiro Sasaki/Idle.png',
              maxFrames: 4
            },
            run: {
              imageSrc: './assets/Kojiro Sasaki/Run.png',
              maxFrames: 8
            },
            jump: {
              imageSrc: './assets/Kojiro Sasaki/Jump.png',
              maxFrames: 2
            },
            fall: {
              imageSrc: './assets/Kojiro Sasaki/Fall.png',
              maxFrames: 2
            },
            attack1: {
              imageSrc: './assets/Kojiro Sasaki/Attack1.png',
              maxFrames: 4
            },
            takeHit: {
              imageSrc: './assets/Miyamoto Mushashi/Take Hit - white silhouette.png',
              maxFrames: 3
            },
            death: {
              imageSrc: './assets/Kojiro Sasaki/Death.png',
              maxFrames: 7
            },
        },
    }
);


console.log(player1);


// =================================================== //
// =================================================== //
// =================================================== //







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

const startAnimation = () => {

    function updateGame() {
        // Update player positions, check collisions, handle game logic, etc.
        if (isGameStarted) {
            player1.velocity.x = 0;
            player2.velocity.x = 0;

            // ================================== player1 ==================================
            if (keys.d.pressed && player1.lastMove === 'd' && player1.position.x + player1.width < canvas.width) {
                player1.velocity.x = velocity_X;
                player1.changeSprite('run');
            } else if (keys.a.pressed && player1.lastMove === 'a' && player1.position.x > 0) {
                player1.velocity.x = -velocity_X;
                player1.changeSprite('run');
            } else {
                player1.changeSprite('idle');
            }

            if (player1.velocity.y < 0) {
                player1.changeSprite('jump')
            } else if (player1.velocity.y > 0) {
                player1.changeSprite('fall')
            }

            if (player1.isAttacking && collision({ player: player1, enemy: player2 })) {
                player1.isAttacking = false;
                player2.health -= 10;
                player2Health.style.width = `${player2.health}%`;
            }


            // ================================== player2 ==================================
            if (keys.ArrowRight.pressed && player2.lastMove === 'ArrowRight' && player2.position.x + player2.width < canvas.width) {
                player2.velocity.x = velocity_X;
                player2.changeSprite('run')
            } else if (keys.ArrowLeft.pressed && player2.lastMove === 'ArrowLeft' && player2.position.x > 0) {
                player2.velocity.x = -velocity_X;
                player2.changeSprite('run')
            } else {
                player2.changeSprite('idle')
            }


            if (player2.velocity.y < 0) {
                player2.changeSprite('jump')
            } else if (player2.velocity.y > 0) {
                player2.changeSprite('fall')
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

gameStart();
startGameButton.addEventListener('click', gameStart)
playAgainButton.addEventListener('click', () => {
    window.location.reload();
    showPlayers = false
})

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const gameEnded = () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
};
