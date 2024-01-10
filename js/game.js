console.log('game.js loaded')

let startTime = Date.now();
let count1 = 0;
let count2 = 1;

if (count1 > totalCharacters - 1) {
    count1 = 0;
}

if (count2 > totalCharacters - 1) {
    count2 = 0;
}


const keys = {
    a: { pressed: false },
    d: { pressed: false },

    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};

const handleKeyDown = (event) => {

    // console.log(event.key);
    // ======================== Player One ========================
    if (!player1.dead) {
        switch (event.key) {
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
        }
    }

    // ======================== Player Two ========================
    if (!player2.dead) {
        switch (event.key) {
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

// Create sprites using preloaded images
window.onload = function () {

    preloadSprites(gameSprites, (sprites) => {
        console.log(sprites);
        console.log(`All sprites are preLoaded in ${Date.now() - startTime} ms.\n\n\n`);

        // Create game objects
        backGround = new Sprite({
            position: { x: 0, y: 0 },
            imgSrc: Sprites.gameObjects.background.src,
        })

        shop = new Sprite({
            position: { x: 0, y: 0 },
            position: { x: 880, y: landingHeight - 447},
            imgSrc: Sprites.gameObjects.shop.src,
            scale: 3.5,
            maxFrames: 6,
            frameHold: 25,
        })

        console.log(backGround, shop);

        gameStart();

        playGame.addEventListener('click', () => {
            playerSelection(count1, count2)
            playGame.classList.add('hidden');
            startGameMessage.classList.remove('hidden');
        })
        
        startAnimation();
    });

};


const startAnimation = () => {
    // console.log(player1, player2);

    // Update player positions, check collisions, handle game logic, etc.
    function updateGame() {
        if (isGameStarted) {
            player1.velocity.x = 0;
            player2.velocity.x = 0;

            // ================================== player1 ==================================

            // Horizontal Movements
            if (keys.d.pressed && player1.lastMove === 'd' && player1.position.x + player1.width < canvas.width) {
                player1.velocity.x = velocity_X;
                player1.changeSprite('run');
            } else if (keys.a.pressed && player1.lastMove === 'a' && player1.position.x > 0) {
                player1.velocity.x = -velocity_X;
                player1.changeSprite('run');
            } else {
                player1.changeSprite('idle');
            }

            // Vertical Movements
            if (player1.velocity.y < 0) {
                player1.changeSprite('jump')
            } else if (player1.velocity.y > 0) {
                player1.changeSprite('fall')
            }

            // Attack [Collision Detection]
            if (player1.isAttacking && collision({ player: player1, enemy: player2 })) {
                player1.isAttacking = false;
                player2.takeHit();
                gsap.to(player2Health, { width: `${player2.health}%` })
            }

            // Player1 Standing
            playerStanding(player1);
            changeDirection({ player: player1, enemy: player2 });


            // ================================== player2 ==================================

            // Horizontal Movements
            if (keys.ArrowRight.pressed && player2.lastMove === 'ArrowRight' && player2.position.x + player2.width < canvas.width) {
                player2.velocity.x = velocity_X;
                player2.changeSprite('run')
            } else if (keys.ArrowLeft.pressed && player2.lastMove === 'ArrowLeft' && player2.position.x > 0) {
                player2.velocity.x = -velocity_X;
                player2.changeSprite('run')
            } else {
                player2.changeSprite('idle')
            }

            // Vertical Movements
            if (player2.velocity.y < 0) {
                player2.changeSprite('jump')
            } else if (player2.velocity.y > 0) {
                player2.changeSprite('fall')
            }

            // Attack [Collision Detection]
            if (player2.isAttacking && collision({ player: player2, enemy: player1 })) {
                player2.isAttacking = false;
                player1.takeHit();
                gsap.to(player1Health, { width: `${player1.health}%` })
            }

            playerStanding(player2);        // Player2 Standing
            changeDirection({ player: player2, enemy: player1 });


            // ================================== Game Over ==================================
            if (player1.health <= 0 || player2.health <= 0) {
                gameOver({ player: player1, enemy: player2, countDownId });
                return;
            }
        }
        // else {
        //     player1.changeSprite('idle');
        //     player2.changeSprite('idle');
        // }
    }

    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        backGround.update();
        shop.update();

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
};


document.addEventListener('keydown', (e) => {
    if (isGameStarted){
        handleKeyDown(e);
    }
});

document.addEventListener('keyup', (e) => {
    if (isGameStarted){
        handleKeyUp(e);
    }
});