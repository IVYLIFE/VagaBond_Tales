const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;


const gravity = 0.2;

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 60;
        this.height = 220;
        this.isAttacking = false;
        this.health = 100;

        // this.color = color;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y > canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
            this.position.y += this.velocity.y;
        }

    }
}


const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },

    ArrowLeft  : { pressed: false },
    ArrowRight : { pressed: false },
    ArrowUp    : { pressed: false },
};

let lastMove;
let poppedMove;
let playerOneMove = [];
let playerTwoMove = [];



let playerOne = new Player(
    {
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 }
    },
);

let playerTwo = new Player(
    {
        position: { x: 900, y: 0 },
        velocity: { x: 0, y: 0 }
    },
);



console.log(playerOne);
console.log(playerTwo);


const startAnimation = () => {
    window.requestAnimationFrame(startAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerOne.update();
    playerTwo.update();
    

    playerOne.velocity.x = 0;

    if (keys.d.pressed && lastMove === 'd' && playerOne.position.x + playerOne.width < canvas.width) {
        playerOne.velocity.x = 3;
    }
    if (keys.a.pressed && lastMove === 'a' && playerOne.position.x > 0) {
        playerOne.velocity.x = -3;
    }

    if(keys.w.pressed && playerOne.position.y + playerOne.height >= canvas.height) {
        playerOne.velocity.y = -12;
    }
    


    // ================================== playerTwo ==================================

    playerTwo.velocity.x = 0;

    if (keys.ArrowRight.pressed && lastMove === 'ArrowRight' && playerTwo.position.x + playerTwo.width < canvas.width) {
        playerTwo.velocity.x = 3;
    }
    if (keys.ArrowLeft.pressed && lastMove === 'ArrowLeft' && playerTwo.position.x > 0) {
        playerTwo.velocity.x = -3;
    }

    if(keys.ArrowUp.pressed && playerTwo.position.y + playerTwo.height >= canvas.height) {
        playerTwo.velocity.y = -12;
    }

}

startAnimation();

document.addEventListener('keydown', (event) => {
    switch (event.key) {

        case 'a':
            keys.a.pressed = true;
            
            if( lastMove && lastMove !== 'a' ) {
                playerOneMove.push('a');
            }
            
            lastMove = 'a';
            break;

        case 'd':
            keys.d.pressed = true;

            if( lastMove && lastMove !== 'd' ) {
                playerOneMove.push('d');
            }

            lastMove = 'd';
            break;

        case 'w':
            keys.w.pressed = true;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;

            if( lastMove && lastMove !== 'ArrowLeft' ) {
                playerTwoMove.push('ArrowLeft');
            }

            lastMove = 'ArrowLeft';
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;

            if( lastMove && lastMove !== 'ArrowRight' ) {
                playerTwoMove.push('ArrowRight');
            }

            lastMove = 'ArrowRight';
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break;

    }
});


document.addEventListener('keyup', (event) => {
    switch (event.key) {

        case 'a':
            
            keys.a.pressed = false;
            poppedMove = playerOneMove.pop();

            if( playerOneMove.length != 0 ) {
                lastMove = 'd';
                keys.d.pressed = true;
            }

            break;

        case 'd':

            keys.d.pressed = false;
            poppedMove = playerOneMove.pop();

            if( playerOneMove.length != 0 ) {
                lastMove = 'a'
                keys.a.pressed = true;
            }

            break;

        case 'w':
            keys.w.pressed = false;
            break;
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            poppedMove = playerTwoMove.pop();

            if( playerTwoMove.length != 0 ) {
                lastMove = 'ArrowRight';
                keys.ArrowRight.pressed = true;
            }

            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            poppedMove = playerTwoMove.pop();

            if( playerTwoMove.length != 0 ) {
                lastMove = 'ArrowLeft';
                keys.ArrowLeft.pressed = true;
            }
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
 
    }
});
