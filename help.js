const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },

    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
};


let isGameStarted     = false;
const gameResult      = document.querySelector('#gameResult');
const startMessage    = document.querySelector('#startGameMessage');
const endMessage      = document.querySelector('#endGameMessage');
const result          = document.querySelector('#result') 
const startGameButton = document.querySelector('#startGame');
const playAgainButton = document.querySelector('#playAgain');
const player1Health   = document.querySelector('#playerOne .healthBar');
const player2Health   = document.querySelector('#playerTwo .healthBar');




let lastMove_V;
const gravity = 0.2;

let player1 = new Player(
    {
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 }
    },
    offset = 1,
    'blue'
);

let player2 = new Player(
    {
        position: { x: 750, y: 0 },
        velocity: { x: 0, y: 0 }
    },
    offset = -1
);


startGameButton.addEventListener('click', () => {
    startMessage.classList.add('hidden');
    isGameStarted = true;
})

playAgainButton.addEventListener('click', () => {
    endMessage.classList.add('hidden');
    isGameStarted = true;
})


const showHealth = () => {

    if(player1.health <= 0){
        isGameStarted = false;
        result.textContent = 'Player Two Wins';
        startMessage.classList.add('hidden')
        endMessage.classList.remove('hidden')
        // window.location.reload();
    }
    
    if(player2.health <= 0){
        isGameStarted = false;
        result.textContent = 'Player One Wins';
        startMessage.classList.add('hidden')
        endMessage.classList.remove('hidden')
        // window.location.reload();
    }
    
    player1Health.style.width = `${player1.health}%`;
    player2Health.style.width = `${player2.health}%`;
}

console.log(player1);
console.log(player2);



const startAnimation = () => {
    window.requestAnimationFrame(startAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();


    // ================================== player1 ==================================
    player1.velocity.x = 0;

    if (keys.d.pressed && 
        player1.lastMove === 'd' && 
        player1.position.x + player1.width < canvas.width ) { 
            player1.velocity.x = 3; 
    }

    if (keys.a.pressed && 
        player1.lastMove === 'a' && 
        player1.position.x > 0) { 
            player1.velocity.x = -3; 
    }


    if (keys.w.pressed) {
        player1.inAir = true; 

        if(player1.position.y + player1.height >= canvas.height){ player1.velocity.y = -10; }
        if( player1.doubleJump && player1.position.y + player1.height <= canvas.height){
            player1.velocity.y = -10;
            player1.doubleJump = false;
        }
    }

    // Player1 Standing
    if( Math.floor( player1.velocity.y + player1.position.y + player1.height) == canvas.height) {
        player1.inAir = false;
        player1.move_V.splice(0, player1.move_V.length);
        player1.count = 1;
    }

    if( player1.isAttacking &&
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x && 
        player1.attackBox.position.x <= player2.position.x + player2.width && 
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y && 
        player1.attackBox.position.y <= player2.position.y + player2.height){
            player2.health -= 10;
            showHealth();
            console.log('Player One Attacked Player Two');
            player1.isAttacking = false;
        }

    if(player1.position.x > player2.position.x + player2.width){
       player1.offset = -1;
    } else {
        player1.offset = 1;
    }





    // ================================== player2 ==================================

    player2.velocity.x = 0;

    if (keys.ArrowRight.pressed && player2.lastMove === 'ArrowRight' && player2.position.x + player2.width < canvas.width) { player2.velocity.x = 3; }
    if (keys.ArrowLeft.pressed && player2.lastMove === 'ArrowLeft' && player2.position.x > 0) { player2.velocity.x = -3; }
    if (keys.ArrowUp.pressed) {
        player2.inAir = true; 

        if(player2.position.y + player2.height >= canvas.height){ player2.velocity.y = -10; }
        if( player2.doubleJump && player2.position.y + player2.height <= canvas.height){
            player2.velocity.y = -10;
            player2.doubleJump = false;
        }
    }

    // Player2 Standing
    if( Math.floor( player2.velocity.y + player2.position.y + player2.height) == canvas.height) {
        player2.inAir = false;
        player2.move_V.splice(0, player2.move_V.length);
        player2.count = 1;
    }

    if( player2.isAttacking &&
        player2.attackBox.position.x + player2.attackBox.width >= player1.position.x && 
        player2.attackBox.position.x <= player1.position.x + player1.width && 
        player2.attackBox.position.y + player2.attackBox.height >= player1.position.y && 
        player2.attackBox.position.y <= player1.position.y + player1.height){
            player1.health -= 10;
            showHealth();
            console.log('Player Two Attacked Player One');
            player2.isAttacking = false;
    }

    if(player2.position.x > player1.position.x + player1.width){
        player2.offset = -1;
     } else {
         player2.offset = 1;
     }

}

showHealth();
startAnimation();

document.addEventListener('keydown', (event) => {
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
            keys.w.pressed = true;

            if (player1.move_V.length < 2 && lastMove_V !== 'w' && player1.count == 1) { player1.move_V.push('w'); }
            if (player1.move_V.length == 2) { 
                player1.doubleJump = true; 
                player1.count = 0; 
                player1.move_V.splice(0, player1.move_V.length);
            }
            lastMove_V = 'w';
            break;

        case ' ':
            player1.isAttacking = true;
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
            keys.ArrowUp.pressed = true;

            if (player2.move_V.length < 2 && lastMove_V !== 'ArrowUp' && player2.count == 1 ) { player2.move_V.push('ArrowUp'); }
            if (player2.move_V.length == 2) { 
                player2.doubleJump = true; 
                player2.count = 0; 
                player2.move_V.splice(0, player2.move_V.length);
            }

            lastMove_V = 'ArrowUp';
            break;

        case 'k':
            player2.isAttacking = true;
            player2.attack();
            break;


    }
});

document.addEventListener('keyup', (event) => {
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

        case 'w':
        case 'W':
            keys.w.pressed = false;
            lastMove_V = '';
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

        case 'ArrowUp':
        case '8':
            keys.ArrowUp.pressed = false;
            lastMove_V = '';
            break;

        case 'k':
        case 'K':
            player2.isAttacking = false;
            break;

    }
});