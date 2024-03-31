console.log('game.js loaded')

import { CONSTANTS, canvas, ctx } from "./constants.js";
import { Player } from "./gameElements.js";
import { 
    isGameStarted, 
    showPlayers,
    countDownId, 
    BackGround, 
    Shop,
    Player1,
    Player2,
    playerStanding,
    changeDirection,
    collision,
    gameOver,
} from "./utils.js";

let animationId;

const keys = {
    a: { pressed: false },
    d: { pressed: false },

    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};

const handleKeyDown = (event) => {

    // console.log(event.key);
    // ======================== Player One ========================
    if (!Player1.dead) {
        switch (event.key) {
            case 'a':
            case 'A':
                keys.a.pressed = true;

                if (Player1.lastMove !== 'a') {
                    Player1.move_H.push('a');
                }

                Player1.lastMove = 'a';
                break;

            case 'd':
            case 'D':
                keys.d.pressed = true;

                if (Player1.lastMove !== 'd') {
                    Player1.move_H.push('d');
                }

                Player1.lastMove = 'd';
                break;

            case 'w':
            case 'W':
                Player1.jumpCount++;
                if (Player1.jumpCount <= 2) {
                    Player1.velocity.y = -CONSTANTS.velocity_Y;
                }
                break;

            case ' ':
                Player1.attack();
                break;
        }
    }

    // ======================== Player Two ========================
    if (!Player2.dead) {
        switch (event.key) {
            case 'ArrowLeft':
            case '4':
                keys.ArrowLeft.pressed = true;

                if (Player2.lastMove !== 'ArrowLeft') {
                    Player2.move_H.push('ArrowLeft');
                }

                Player2.lastMove = 'ArrowLeft';
                break;

            case 'ArrowRight':
            case '6':
                keys.ArrowRight.pressed = true;

                if (Player2.lastMove !== 'ArrowRight') {
                    Player2.move_H.push('ArrowRight');
                }

                Player2.lastMove = 'ArrowRight';
                break;

            case 'ArrowUp':
            case '8':
                Player2.jumpCount++;
                if (Player2.jumpCount <= 2) {
                    Player2.velocity.y = -CONSTANTS.velocity_Y;
                }
                break;

            case 'k':
            case 'K':
            case 'ArrowDown':
            case '5':
                Player2.attack();
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
            Player1.move_H.pop();

            if (Player1.move_H.length != 0) {
                Player1.lastMove = 'd';
                keys.d.pressed = true;
            }

            break;

        case 'd':
        case 'D':
            keys.d.pressed = false;
            Player1.move_H.pop();

            if (Player1.move_H.length != 0) {
                Player1.lastMove = 'a'
                keys.a.pressed = true;
            }

            break;
            
        case ' ':
            Player1.isAttacking = false;
            break;


        // ======================== Player Two ========================
        case 'ArrowLeft':
        case '4':
            keys.ArrowLeft.pressed = false;
            Player2.move_H.pop();

            if (Player2.move_H.length != 0) {
                Player2.lastMove = 'ArrowRight';
                keys.ArrowRight.pressed = true;
            }

            break;

        case 'ArrowRight':
        case '6':
            keys.ArrowRight.pressed = false;
            Player2.move_H.pop();

            if (Player2.move_H.length != 0) {
                Player2.lastMove = 'ArrowLeft';
                keys.ArrowLeft.pressed = true;
            }
            break;

        case 'k':
        case 'K':
        case 'ArrowDown':
        case '5':
            Player2.isAttacking = false;
            break;

    }

}

const startAnimation = () => {

    // Update player positions, check collisions, handle game logic, etc.
    function updateGame() {
        if (isGameStarted) {
            Player1.velocity.x = 0;
            Player2.velocity.x = 0;

            // ================================== player1 ==================================

            // Horizontal Movements
            if (keys.d.pressed && Player1.lastMove === 'd' && Player1.position.x + Player1.width < canvas.width) {
                Player1.velocity.x = CONSTANTS.velocity_X;
                Player1.changeSprite('run');
            } else if (keys.a.pressed && Player1.lastMove === 'a' && Player1.position.x > 0) {
                Player1.velocity.x = -CONSTANTS.velocity_X;
                Player1.changeSprite('run');
            } else {
                Player1.changeSprite('idle');
            }

            // Vertical Movements
            if (Player1.velocity.y < 0) {
                Player1.changeSprite('jump')
            } else if (Player1.velocity.y > 0) {
                Player1.changeSprite('fall')
            }

            // Attack [Collision Detection]
            if (Player1.isAttacking && collision({ player: Player1, enemy: Player2 })) {
                Player1.isAttacking = false;
                Player2.takeHit();
                gsap.to(player2Health, { width: `${Player2.health}%` })
            }

            // Player1 Standing
            playerStanding(Player1);
            changeDirection({ player: Player1, enemy: Player2 });


            // ================================== player2 ==================================

            // Horizontal Movements
            if (keys.ArrowRight.pressed && Player2.lastMove === 'ArrowRight' && Player2.position.x + Player2.width < canvas.width) {
                Player2.velocity.x = CONSTANTS.velocity_X;
                Player2.changeSprite('run')
            } else if (keys.ArrowLeft.pressed && Player2.lastMove === 'ArrowLeft' && Player2.position.x > 0) {
                Player2.velocity.x = -CONSTANTS.velocity_X;
                Player2.changeSprite('run')
            } else {
                Player2.changeSprite('idle')
            }

            // Vertical Movements
            if (Player2.velocity.y < 0) {
                Player2.changeSprite('jump')
            } else if (Player2.velocity.y > 0) {
                Player2.changeSprite('fall')
            }

            // Attack [Collision Detection]
            if (Player2.isAttacking && collision({ player: Player2, enemy: Player1 })) {
                Player2.isAttacking = false;
                Player1.takeHit();
                gsap.to(player1Health, { width: `${Player1.health}%` })
            }

            // Player2 Standing
            playerStanding(Player2);
            changeDirection({ player: Player2, enemy: Player1 });


            // ================================== Game Over ==================================
            if (Player1.health <= 0 || Player2.health <= 0) {
                gameOver({ player: Player1, enemy: Player2, countDownId });
                return;
            }
        }
    }

    function renderGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        BackGround.update();
        Shop.update();

        if (showPlayers) {
            Player1.update();
            Player2.update();
        }

        // Continue the game loop
        animationId = requestAnimationFrame(() => {
            updateGame();
            renderGame();
        });
    }

    renderGame();
};


export {
    startAnimation,
    handleKeyDown,
    handleKeyUp,

    animationId,
}