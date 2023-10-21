const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;


const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
};

let lastMove1_H;
let lastMove_V;
let playerOneMove_H = [];
let playerOneMove_V = [];



let count1 = 1;
const gravity = 0.2;


class Player {
    constructor({ position, velocity }, offset) {
        this.position = position;
        this.velocity = velocity;
        this.width = 40;
        this.height = 180;
        this.isAttacking = false;
        this.health = 100;
        this.offset = offset;
        this.isAttacking = false;
        this.doubleJump = false;
        this.inAir = false;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        let attackBox = {
            x: this.position.x + this.width,
            y: this.position.y,
            width: 80,
            height: 30
        }

        if (this.isAttacking) {
            ctx.fillStyle = 'red';
            if (this.offset === 1) {
                ctx.fillRect(attackBox.x, attackBox.y, attackBox.width, attackBox.height);
            } else {
                ctx.fillRect(this.position.x - attackBox.width, attackBox.y, attackBox.width, attackBox.height);
            }
        }

        this.isAttacking = false;
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


let playerOne = new Player(
    {
        position: { x: 600, y: 0 },
        velocity: { x: 0, y: 0 }
    },
    offset = 1
);
console.log(playerOne);



const startAnimation = () => {
    window.requestAnimationFrame(startAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerOne.update();

    playerOne.velocity.x = 0;

    if (keys.d.pressed && lastMove1_H === 'd' && playerOne.position.x + playerOne.width < canvas.width) { playerOne.velocity.x = 3; }
    if (keys.a.pressed && lastMove1_H === 'a' && playerOne.position.x > 0) { playerOne.velocity.x = -3; }
    if (keys.w.pressed) {
    playerOne.inAir = true;

    if (playerOne.position.y + playerOne.height >= canvas.height) { playerOne.velocity.y = -10; }
    if (playerOne.doubleJump && playerOne.position.y + playerOne.height <= canvas.height) {
        playerOne.velocity.y = -10;
        playerOne.doubleJump = false;
    }
    }

    // Player1 Standing
    if (Math.floor(playerOne.velocity.y + playerOne.position.y + playerOne.height) == canvas.height) {
        playerOne.inAir = false;
        playerOneMove_V.splice(0, playerOneMove_V.length);
        count1 = 1;
    }

}

startAnimation();

document.addEventListener('keydown', (event) => {
    switch (event.key) {


        // ======================== Player One ========================

        case 'a':
        case 'A':
            keys.a.pressed = true;

            if (lastMove1_H && lastMove1_H !== 'a') {
                playerOneMove_H.push('a');
            }

            lastMove1_H = 'a';
            break;

        case 'd':
        case 'D':
            keys.d.pressed = true;

            if (lastMove1_H && lastMove1_H !== 'd') {
                playerOneMove_H.push('d');
            }

            lastMove1_H = 'd';
            break;

        case 'w':
        case 'W':
            keys.w.pressed = true;

            if (playerOneMove_V.length < 2 && lastMove_V !== 'w' && count1 == 1) { playerOneMove_V.push('w'); }
            if (playerOneMove_V.length == 2) { 
                playerOne.doubleJump = true; 
                count1 = 0; 
                playerOneMove_V.splice(0, playerOneMove_V.length);
            }
            lastMove_V = 'w';
            break;

        case ' ':
            playerOne.isAttacking = true;
            break;
    }
});


document.addEventListener('keyup', (event) => {
    switch (event.key) {


        // ======================== Player One ========================

        case 'a':
        case 'A':

            keys.a.pressed = false;
            playerOneMove_H.pop();

            if (playerOneMove_H.length != 0) {
                lastMove1_H = 'd';
                keys.d.pressed = true;
            }

            break;

        case 'd':
        case 'D':

            keys.d.pressed = false;
            playerOneMove_H.pop();

            if (playerOneMove_H.length != 0) {
                lastMove1_H = 'a'
                keys.a.pressed = true;
            }

            break;

        case 'w':
        case 'W':
            keys.w.pressed = false;
            lastMove_V = '';
            break;

        case ' ':
            playerOne.isAttacking = false;
            break;

    }
});


