console.log('gameElements.js loaded')

import {
    ctx,
    CONSTANTS
} from './constants.js';

let LoadedSprites = {};

const gameSprites = {
    gameObjects: {
        background: '../assets/backgroundSprites/background.png',
        shop: '../assets/backgroundSprites/shop.png',
    },

    miyamoto: {
        idle: '../assets/charactersSprites/Miyamoto Mushashi/Idle.png',
        attack1: '../assets/charactersSprites/Miyamoto Mushashi/Attack1.png',
        run: '../assets/charactersSprites/Miyamoto Mushashi/Run.png',
        jump: '../assets/charactersSprites/Miyamoto Mushashi/Jump.png',
        takehit: '../assets/charactersSprites/Miyamoto Mushashi/TakeHit.png',
        fall: '../assets/charactersSprites/Miyamoto Mushashi/Fall.png',
        death: '../assets/charactersSprites/Miyamoto Mushashi/Death.png',
    },

    kojiro: {
        idle: '../assets/charactersSprites/Kojiro Sasaki/Idle.png',
        attack1: '../assets/charactersSprites/Kojiro Sasaki/Attack1.png',
        run: '../assets/charactersSprites/Kojiro Sasaki/Run.png',
        jump: '../assets/charactersSprites/Kojiro Sasaki/Jump.png',
        takehit: '../assets/charactersSprites/Kojiro Sasaki/TakeHit.png',
        fall: '../assets/charactersSprites/Kojiro Sasaki/Fall.png',
        death: '../assets/charactersSprites/Kojiro Sasaki/Death.png',
    },

    evilWizard: {
        idle: '../assets/charactersSprites/Evil Wizard/Idle.png',
        attack1: '../assets/charactersSprites/Evil Wizard/Attack1.png',
        run: '../assets/charactersSprites/Evil Wizard/Run.png',
        jump: '../assets/charactersSprites/Evil Wizard/Jump.png',
        takehit: '../assets/charactersSprites/Evil Wizard/TakeHit.png',
        fall: '../assets/charactersSprites/Evil Wizard/Fall.png',
        death: '../assets/charactersSprites/Evil Wizard/Death.png',
    },

    fantasyWarrior: {
        idle: '../assets/charactersSprites/Fantasy Warrior/Idle.png',
        attack1: '../assets/charactersSprites/Fantasy Warrior/Attack1.png',
        run: '../assets/charactersSprites/Fantasy Warrior/Run.png',
        jump: '../assets/charactersSprites/Fantasy Warrior/Jump.png',
        takehit: '../assets/charactersSprites/Fantasy Warrior/TakeHit.png',
        fall: '../assets/charactersSprites/Fantasy Warrior/Fall.png',
        death: '../assets/charactersSprites/Fantasy Warrior/Death.png',
    },

    medievalKing: {
        idle: '../assets/charactersSprites/Medieval King/Idle.png',
        attack1: '../assets/charactersSprites/Medieval King/Attack1.png',
        run: '../assets/charactersSprites/Medieval King/Run.png',
        jump: '../assets/charactersSprites/Medieval King/Jump.png',
        takehit: '../assets/charactersSprites/Medieval King/TakeHit.png',
        fall: '../assets/charactersSprites/Medieval King/Fall.png',
        death: '../assets/charactersSprites/Medieval King/Death.png',
    },
};

const characters = {
    list: {
        evilWizard: {
            name: 'Evil Wizard',
            maxFrames: 8,
            scale: 2.4,
            scale2: 1,
            frameHold: 20,
            dimension: {
                width: 35,
                height: 57,
            },
            spriteOffset: {
                x: 108,
                y: 48,
            },
            attackBox: {
                offset: { dir: 1, y: 10 },
                width: 60,
                height: 25,
            },
        },
        fantasyWarrior: {
            name: 'Fantasy Warrior',
            maxFrames: 10,
            scale: 3,
            scale2: 1,
            frameHold: 20,
            dimension: {
                width: 27,
                height: 45,
            },
            spriteOffset: {
                x: 66,
                y: 22,
            },
            attackBox: {
                offset: { dir: 1, y: 10 },
                width: 35,
                height: 20,
            },
        },
        kojiro: {
            name: 'Kojiro Sasaki',
            maxFrames: 4,
            scale: 2.5,
            scale2: 1,
            frameHold: 25,
            dimension: {
                width: 33,
                height: 56,
            },
            spriteOffset: {
                x: 81,
                y: 10,
            },
            attackBox: {
                offset: { dir: 1, y: 10 },
                width: 55,
                height: 25,
            },
        },
        medievalKing: {
            name: 'Medieval King',
            maxFrames: 8,
            scale: 2.5,
            scale2: 1,
            frameHold: 20,
            dimension: {
                width: 32,
                height: 55,
            },
            spriteOffset: {
                x: 64,
                y: 14,
            },
            attackBox: {
                offset: { dir: 1, y: 10 },
                width: 49,
                height: 22,
            },
        },
        miyamoto: {
            name: 'Miyamoto Mushashi',
            maxFrames: 8,
            scale: 2.5,
            scale2: 1,
            frameHold: 15,
            dimension: {
                width: 32,
                height: 58,
            },
            spriteOffset: {
                x: 76,
                y: 22,
            },
            attackBox: {
                offset: { dir: 1, y: 10 },
                width: 55,
                height: 25,
            }
        },
    },

    get numbers(){
        return Object.keys(this.list).length
    },

    preload: function () {
        characters.list.evilWizard.img = LoadedSprites.evilWizard.idle
        characters.list.evilWizard.sprites = {
            idle: {
                image: LoadedSprites.evilWizard.idle,
                maxFrames: 8
            },
            run: {
                image: LoadedSprites.evilWizard.run,
                maxFrames: 8
            },
            jump: {
                image: LoadedSprites.evilWizard.jump,
                maxFrames: 2
            },
            fall: {
                image: LoadedSprites.evilWizard.fall,
                maxFrames: 2
            },
            attack1: {
                image: LoadedSprites.evilWizard.attack1,
                maxFrames: 8
            },
            takeHit: {
                image: LoadedSprites.evilWizard.takehit,
                maxFrames: 3
            },
            death: {
                image: LoadedSprites.evilWizard.death,
                maxFrames: 7
            }
        }

        characters.list.fantasyWarrior.img = LoadedSprites.fantasyWarrior.idle
        characters.list.fantasyWarrior.sprites = {
            idle: {
                image: LoadedSprites.fantasyWarrior.idle,
                maxFrames: 10
            },
            run: {
                image: LoadedSprites.fantasyWarrior.run,
                maxFrames: 8
            },
            jump: {
                image: LoadedSprites.fantasyWarrior.jump,
                maxFrames: 3
            },
            fall: {
                image: LoadedSprites.fantasyWarrior.fall,
                maxFrames: 3
            },
            attack1: {
                image: LoadedSprites.fantasyWarrior.attack1,
                maxFrames: 7
            },
            takeHit: {
                image: LoadedSprites.fantasyWarrior.takehit,
                maxFrames: 3
            },
            death: {
                image: LoadedSprites.fantasyWarrior.death,
                maxFrames: 7
            }
        }

        characters.list.kojiro.img = LoadedSprites.kojiro.idle
        characters.list.kojiro.sprites = {
            idle: {
                image: LoadedSprites.kojiro.idle,
                maxFrames: 4
            },
            run: {
                image: LoadedSprites.kojiro.run,
                maxFrames: 8
            },
            jump: {
                image: LoadedSprites.kojiro.jump,
                maxFrames: 2
            },
            fall: {
                image: LoadedSprites.kojiro.fall,
                maxFrames: 2
            },
            attack1: {
                image: LoadedSprites.kojiro.attack1,
                maxFrames: 4
            },
            takeHit: {
                image: LoadedSprites.kojiro.takehit,
                maxFrames: 3
            },
            death: {
                image: LoadedSprites.kojiro.death,
                maxFrames: 7
            }
        }

        characters.list.medievalKing.img = LoadedSprites.medievalKing.idle
        characters.list.medievalKing.sprites = {
            idle: {
                image: LoadedSprites.medievalKing.idle,
                maxFrames: 8
            },
            run: {
                image: LoadedSprites.medievalKing.run,
                maxFrames: 8
            },
            jump: {
                image: LoadedSprites.medievalKing.jump,
                maxFrames: 2
            },
            fall: {
                image: LoadedSprites.medievalKing.fall,
                maxFrames: 2
            },
            attack1: {
                image: LoadedSprites.medievalKing.attack1,
                maxFrames: 4
            },
            takeHit: {
                image: LoadedSprites.medievalKing.takehit,
                maxFrames: 4
            },
            death: {
                image: LoadedSprites.medievalKing.death,
                maxFrames: 6
            }
        }

        characters.list.miyamoto.img = LoadedSprites.miyamoto.idle
        characters.list.miyamoto.sprites = {
            idle: {
                image: LoadedSprites.miyamoto.idle,
                maxFrames: 8
            },
            run: {
                image: LoadedSprites.miyamoto.run,
                maxFrames: 8
            },
            jump: {
                image: LoadedSprites.miyamoto.jump,
                maxFrames: 2
            },
            fall: {
                image: LoadedSprites.miyamoto.fall,
                maxFrames: 2
            },
            attack1: {
                image: LoadedSprites.miyamoto.attack1,
                maxFrames: 6
            },
            takeHit: {
                image: LoadedSprites.miyamoto.takehit,
                maxFrames: 4
            },
            death: {
                image: LoadedSprites.miyamoto.death,
                maxFrames: 6
            }
        }
    },
}


class Sprite {
    constructor({
        position,
        spriteOffset = { x: 0, y: 0, dir: 1 },
        img,
        scale = 1,
        maxFrames = 1,
        frameHold
    }) {
        this.position = position
        this.spriteOffset = spriteOffset
        this.image = img
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = frameHold
        this.frameWidth = this.image.width / this.maxFrames
        this.frameHeight = this.image.height
    }

    draw() {
        if (this.spriteOffset.dir == 1) {
            ctx.drawImage(
                this.image,
                this.currentFrame * this.frameWidth, 0,          // Starting position for clipping (x, y)
                this.frameWidth, this.frameHeight,               // Width and height of the clipped image
                this.position.x - this.spriteOffset.x,           // X-Position on the canvas to draw the image
                this.position.y,                                 // Y-Position on the canvas to draw the image
                // this.position.y - this.spriteOffset.y,           // Y-Position on the canvas to draw the image
                this.frameWidth * this.scale,                    // Width of the drawn image on the canvas
                this.image.height * this.scale                   // Height of the drawn image on the canvas
            )
        } else {
            ctx.save();
            ctx.scale(-1, 1);

            // ctx.fillStyle = "blue"; // Fill color
            // ctx.fillRect(-1200, 670, this.width, 100); // (x, y, width, height)

            ctx.drawImage(
                this.image,
                (1 + this.currentFrame) * this.frameWidth, 0,                                    // Starting position for clipping (x, y)
                (-1 * this.frameWidth), this.frameHeight,                                        // Width and height of the clipped image
                -this.position.x - this.spriteOffset.x - this.width,                             // X-Position on the canvas to draw the image
                this.position.y,                                                                 // Y-Position on the canvas to draw the image 
                this.frameWidth * this.scale,                                                    // Width of the drawn image on the canvas
                this.image.height * this.scale                                                   // Height of the drawn image on the canvas
            );

            ctx.restore(); // Restore the last saved state
        }

        // draw a rectangle around the player
        if (this.frameWidth === CONSTANTS.gameCanvasWidth) {
            ctx.fillStyle = '#0000FF50';
            ctx.fillRect(
                this.position.x - this.spriteOffset.x,
                this.position.y - this.spriteOffset.y,
                this.frameWidth * this.scale,
                this.frameHeight * this.scale
            );
        } else {
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 2;

            ctx.strokeRect(
                this.position.x,
                this.position.y + (this.frameHeight * this.scale) - this.height,
                this.width,
                this.height,
            );
        }
    }

    update() {
        this.draw()
        this.changeFrame()
    }

    changeFrame() {
        this.frameElapsed++

        if (this.frameElapsed % this.frameHold == 0) {
            this.frameElapsed = 0
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    }
}

class Player extends Sprite {
    constructor({
        position,
        velocity,
        img,
        maxFrames = 1,
        scale = 1,
        frameHold,
        sprites,
        spriteOffset,
        playerOffset,
        dimension,
        attackBox,
        name,
    }) {
        super({
            position, // store the position of the player
            img,
            maxFrames,
            scale,
            frameHold,
            spriteOffset,
        })

        this.sprites = sprites
        this.name = name

        // Width and height of the player
        this.width = Math.floor(dimension.width * this.scale)
        this.height = Math.floor(dimension.height * this.scale)

        this.velocity = velocity // store the velocity of the player
        this.playerOffset = playerOffset

        this.doubleJump = false // checks if the player can double jump or not
        this.lastMove // store the last move in horizontal direction
        this.move_H = [] // store the last two horizontal moves
        this.jumpCount = 0 // store the number of jumps

        this.isAttacking // checks if the player is attacking or not
        this.health = 100 // store the health of the player
        this.dead = false
        this.attackBox = {
            offset: attackBox.offset,
            width: attackBox.width * this.scale,
            height: attackBox.height * this.scale,
            position: {
                x: this.position.x,
                y: this.position.y
            }
        }
    }

    update() {
        if(this.sprites.death.image === this.image && this.currentFrame >= this.maxFrames - 1){
           this.dead = true
        }
        this.draw()
         if (!this.dead) { this.changeFrame() }

        if (this.spriteOffset.dir === 1) {
            this.attackBox.position.x = this.position.x + this.width + this.attackBox.width
        }
        else {
            this.attackBox.position.x = this.position.x - this.attackBox.width
        }


        this.attackBox.position.y = this.position.y - this.attackBox.height + (this.image.height - this.attackBox.offset.y) * this.scale
        ctx.fillStyle = this.spriteOffset.dir === 1 ? '#FF000050' : '#00FF0050';

        ctx.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.spriteOffset.dir === 1 ? -this.attackBox.width : this.attackBox.width,
            this.attackBox.height
        );

        this.position.x += this.velocity.x
        if (Math.floor(
            this.position.y +
            this.image.height *
            this.scale +
            this.velocity.y) > CONSTANTS.landingHeight) {
            // if (Math.floor(this.position.y + this.height + this.velocity.y) > CONSTANTS.landingHeight) {
            this.velocity.y = 0
        } else {
            this.velocity.y += CONSTANTS.gravity
            this.position.y += this.velocity.y
        }
    }


    attack() {
        this.changeSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    takeHit() {
        this.health -= 40;

        if (this.health <= 0) {
            this.health = 0
            this.changeSprite('death')
        } else {
            this.changeSprite('takeHit')
        }
    }

    changeSprite(sprite, Ended) {
        // console.log(this.name , "is changed to ", sprite)

        if(!Ended){
            if (this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.maxFrames - 1) return
            if (this.image === this.sprites.takeHit.image && this.currentFrame < this.sprites.takeHit.maxFrames - 1) return
        }
        
        // console.log(this.name , "22 is changed to ", sprite)

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    // console.log(this.name , ": I am idle")
                    this.image = this.sprites.idle.image
                    this.maxFrames = this.sprites.idle.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.maxFrames = this.sprites.run.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.maxFrames = this.sprites.jump.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.maxFrames = this.sprites.fall.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.maxFrames = this.sprites.attack1.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.maxFrames = this.sprites.takeHit.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.maxFrames = this.sprites.death.maxFrames
                    this.currentFrame = 0
                }
                break
        }

    }
}


// Preload images
const preloadSprites = (spritesObject, callback) => {

    let loadedSprites = 0;
    const totalSprites = Object.keys(spritesObject).length;

    for (const sprite in spritesObject) {

        let images = {}
        let loadedImages = 0;
        const totalImages = Object.keys(spritesObject[sprite]).length;

        for (const imageKey in spritesObject[sprite]) {
            const img = new Image();
            img.src = spritesObject[sprite][imageKey];

            img.onload = () => {
                loadedImages++;
                // console.log(`Image with key ${imageKey} is loaded in  ${Date.now() - newTime} ms. .`);
                if (loadedImages >= totalImages) {
                    loadedSprites++;
                    // console.log(`Sprite with name ${sprite} is loaded.`);
                    if (loadedSprites >= totalSprites) {
                        callback(LoadedSprites);
                        characters.preload();
                    }
                }
            }

            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
            };

            images[imageKey] = img;
        }

        LoadedSprites[sprite] = images;
    }

    return characters;
};


export {
    Sprite,
    Player,
    gameSprites,
    characters,
    LoadedSprites,
    preloadSprites
}
