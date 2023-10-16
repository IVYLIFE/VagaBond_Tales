const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
// canvas.width = 1020;
// canvas.height = 900;

const gravity = 0.2;

class Fighter {
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
};


let playerOne = new Fighter(
    {
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 }
    },
);

let playerTwo = new Fighter(
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
    if (keys.d.pressed) {
        playerOne.velocity.x = 1;
    }
    if (keys.a.pressed) {
        playerOne.velocity.x = -1;
    }


}

startAnimation();



document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true;
            break;

        case 'd':
            keys.d.pressed = true;
            break;

        case 'w':
            keys.w.pressed = true;
            break;
    }

    console.log(event.key);
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 'w':
            keys.w.pressed = false;
            break;
    }

    console.log(event.key);
});
