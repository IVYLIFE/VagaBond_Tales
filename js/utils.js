class Player {
    constructor({ position, velocity }, offset, color = 'cyan') {
        this.position = position;                  // store the position of the player
        this.velocity = velocity;                  // store the velocity of the player

        this.width = 40;                           // store the width of the player
        this.height = 180;                         // store the height of the player
        this.health = 100;                         // store the health of the player

        this.offset = offset;                      // store the offset of the player
        this.color = color;                        // store the color of the player

        this.attackBox = {
            width: 110,
            height: 30,
            position: {
                x : this.position.x,
                y : this.position.y
            }
        }

        this.isAttacking;                          // checks if the player is attacking or not
        this.doubleJump = false;                   // checks if the player can double jump or not
        this.inAir = false;                        // checks if the player is in air or not

        this.lastMove;                             // store the last move in horizontal direction
        this.move_H = [];                          // store the last two horizontal moves
        this.move_V = [];                          // store the last two vertical moves
        this.count = 1;                            // set double jump validity [ 1 = true, 0 = false]
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
        this.attackBox.position.x = (this.offset === 1) ? this.position.x  : this.position.x - this.attackBox.width + this.width;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y > canvas.height) {
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
