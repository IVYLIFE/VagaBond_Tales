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

const landingHeight = canvas.height - 105;
const velocity_X = 2.5;
const velocity_Y = 8.5;
const gravity = 0.2;


const startGame = document.querySelector('#startGame');
const playAgain = document.querySelector('#playAgain');

const imageSources = [
    './assets/background.png',
    './assets/shop.png',
    '../assets/charactersSprites/Miyamoto Mushashi/Idle.png'
];

const characters = {
    'miyamoto': {
        name: 'Miyamoto Mushashi',
        imgSrc: '../assets/charactersSprites/Miyamoto Mushashi/Idle.png',
        maxFrames: 8,
        scale: 2.5,
        frameHold: 15,
        animate: true,
        spriteOffset: {
            x: 185,
            y: 172,
        },
        sprites: {
            idle: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Idle.png',
                maxFrames: 8
            },
            run: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Run.png',
                maxFrames: 8
            },
            jump: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Jump.png',
                maxFrames: 2
            },
            fall: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Fall.png',
                maxFrames: 2
            },
            attack1: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Attack1.png',
                maxFrames: 6
            },
            takeHit: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Take Hit.png',
                maxFrames: 4
            },
            death: {
                imageSrc: '../assets/charactersSprites/Miyamoto Mushashi/Death.png',
                maxFrames: 6
            }
        },
    },

    'kojiro': {
        name: 'Kojiro Sasaki',
        imgSrc: '../assets/charactersSprites/Kojiro Sasaki/Idle.png',
        maxFrames: 4,
        scale: 2.5,
        frameHold: 25,
        animate: true,
        spriteOffset: {
            x: 185,
            y: 185,
        },
        sprites: {
            idle: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Idle.png',
                maxFrames: 4
            },
            run: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Run.png',
                maxFrames: 8
            },
            jump: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Jump.png',
                maxFrames: 2
            },
            fall: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Fall.png',
                maxFrames: 2
            },
            attack1: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Attack1.png',
                maxFrames: 4
            },
            takeHit: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Take hit.png',
                maxFrames: 3
            },
            death: {
                imageSrc: '../assets/charactersSprites/Kojiro Sasaki/Death.png',
                maxFrames: 7
            },
        },

    },

    'evilWizard': {
        name: 'Evil Wizard',
        imgSrc: '../assets/charactersSprites/Evil Wizard/Idle.png',
        maxFrames: 8,
        scale: 2.4,
        frameHold: 10,
        animate: true,
        spriteOffset: {
            x: 185,
            y: 265,
        },
        sprites: {
            idle: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Idle.png',
                maxFrames: 8
            },
            run: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Run.png',
                maxFrames: 8
            },
            jump: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Jump.png',
                maxFrames: 2
            },
            fall: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Fall.png',
                maxFrames: 2
            },
            attack1: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Attack1.png',
                maxFrames: 8
            },
            takeHit: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Take Hit.png',
                maxFrames: 3
            },
            death: {
                imageSrc: '../assets/charactersSprites/Evil Wizard/Death.png',
                maxFrames: 7
            }
        },
    },

    'fantasyWarrior': {
        name: 'Fantasy Warrior',
        imgSrc: '../assets/charactersSprites/Fantasy Warrior/Idle.png',
        maxFrames: 10,
        scale: 3,
        frameHold: 10,
        animate: true,
        spriteOffset: {
            x: 185,
            y: 168,
        },
        sprites: {
            idle: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Idle.png',
                maxFrames: 10
            },
            run: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Run.png',
                maxFrames: 8
            },
            jump: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Jump.png',
                maxFrames: 3
            },
            fall: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Fall.png',
                maxFrames: 3
            },
            attack1: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Attack1.png',
                maxFrames: 7
            },
            takeHit: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Take Hit.png',
                maxFrames: 3
            },
            death: {
                imageSrc: '../assets/charactersSprites/Fantasy Warrior/Death.png',
                maxFrames: 7
            }
        },
    },

    'medievalKing': {
        name: 'Medieval King',
        imgSrc: '../assets/charactersSprites/Medieval King/Idle.png',
        maxFrames: 8,
        scale: 3,
        frameHold: 20,
        animate: true,
        spriteOffset: {
            x: 185,
            y: 180,
        },
        sprites: {
            idle: {
                imageSrc: '../assets/charactersSprites/Medieval King/Idle.png',
                maxFrames: 8
            },
            run: {
                imageSrc: '../assets/charactersSprites/Medieval King/Run.png',
                maxFrames: 8
            },
            jump: {
                imageSrc: '../assets/charactersSprites/Medieval King/Jump.png',
                maxFrames: 2
            },
            fall: {
                imageSrc: '../assets/charactersSprites/Medieval King/Fall.png',
                maxFrames: 2
            },
            attack1: {
                imageSrc: '../assets/charactersSprites/Medieval King/Attack1.png',
                maxFrames: 4
            },
            takeHit: {
                imageSrc: '../assets/charactersSprites/Medieval King/Take Hit.png',
                maxFrames: 4
            },
            death: {
                imageSrc: '../assets/charactersSprites/Medieval King/Death.png',
                maxFrames: 6
            }
        },


    },
}







// =================================================== //
// =================================================== //
// =================================================== //


let num1 = 0;
let num2 = 1;
let num3 = localStorage.getItem('player1');
let num4 = localStorage.getItem('player2');

let char1 = Object.keys(characters)[num3];
let char2 = Object.keys(characters)[num4];

let characterSprites;

// Preload previewSprites and start animation after previewSprites are preloaded
const preloadSprites = async () => {
    const promises = Object.values(playerSpritesPreview).map(async (sprite) => {
        const img = new Image();
        img.src = sprite.src;
        await new Promise((resolve) => (img.onload = resolve));
        return img;
    });

    characterSprites = await Promise.all(promises);
    return characterSprites;
};


// =================== Game Elements ================= //

const backGroundSprite = new Sprite({
    position: { x: 0, y: 0 },
    imgSrc: './assets/background.png',
    animate: false,
})

const shopSprite = new Sprite({
    position: { x: 880, y: landingHeight - 473 },
    imgSrc: './assets/shop.png',
    animate: true,
    scale: 3.5,
    maxFrames: 6,
    frameHold: 25,
})


const player1 = new Player(
    {
        ...characters[char1], // Spread the properties of 'miyamoto'
        position: { x: 100, y: 0 },
        velocity: { x: 0, y: 0 },
        attackOffset: 1,
        playerOffset: 1,
        spriteOffset: {
            ...characters[char1].spriteOffset, // Spread the spriteOffset properties
            dir: 1, // Update the dir value
        },
    }
);

const player2 = new Player(
    {
        ...characters[char2], // Spread the properties of 'miyamoto'
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 },
        attackOffset: -1,
        playerOffset: -1,
        spriteOffset: {
            ...characters[char2].spriteOffset, // Spread the spriteOffset properties
            dir: -1, // Update the dir value
        }
    },
);


// // Main function
// preloadSprites().then((loadedImages) => {



// });


console.log(player1);
console.log(player2);



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
            changeDirection({ player: player1, enemy: player2 });

            playerStanding(player2);        // Player2 Standing
            changeDirection({ player: player2, enemy: player1 });


            // ================================== Game Over ==================================
            if (player1.health <= 0 || player2.health <= 0) {
                gameOver({ player: player1, enemy: player2, countDownId });
                return;
            }
        } else {
            player1.changeSprite('idle');
            player2.changeSprite('idle');
        }
    }

    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        backGroundSprite.update();
        shopSprite.update();

        if (showPlayers) {
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

startGame.addEventListener('click', gameStart)
playAgain.addEventListener('click', () => {
    window.location.reload();
    showPlayers = false
})


document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);