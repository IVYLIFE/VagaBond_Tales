console.log('gameElements.js loaded')

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
        takehit: '../assets/charactersSprites/Miyamoto Mushashi/Take Hit.png',
        fall: '../assets/charactersSprites/Miyamoto Mushashi/Fall.png',
        death: '../assets/charactersSprites/Miyamoto Mushashi/Death.png',
    },

    kojiro: {
        idle: '../assets/charactersSprites/Kojiro Sasaki/Idle.png',
        attack1: '../assets/charactersSprites/Kojiro Sasaki/Attack1.png',
        run: '../assets/charactersSprites/Kojiro Sasaki/Run.png',
        jump: '../assets/charactersSprites/Kojiro Sasaki/Jump.png',
        takehit: '../assets/charactersSprites/Kojiro Sasaki/Take Hit.png',
        fall: '../assets/charactersSprites/Kojiro Sasaki/Fall.png',
        death: '../assets/charactersSprites/Kojiro Sasaki/Death.png',
    },

    evilWizard: {
        idle: '../assets/charactersSprites/Evil Wizard/Idle.png',
        attack1: '../assets/charactersSprites/Evil Wizard/Attack1.png',
        run: '../assets/charactersSprites/Evil Wizard/Run.png',
        jump: '../assets/charactersSprites/Evil Wizard/Jump.png',
        takehit: '../assets/charactersSprites/Evil Wizard/Take Hit.png',
        fall: '../assets/charactersSprites/Evil Wizard/Fall.png',
        death: '../assets/charactersSprites/Evil Wizard/Death.png',
    },

    fantasyWarrior: {
        idle: '../assets/charactersSprites/Fantasy Warrior/Idle.png',
        attack1: '../assets/charactersSprites/Fantasy Warrior/Attack1.png',
        run: '../assets/charactersSprites/Fantasy Warrior/Run.png',
        jump: '../assets/charactersSprites/Fantasy Warrior/Jump.png',
        takehit: '../assets/charactersSprites/Fantasy Warrior/Take Hit.png',
        fall: '../assets/charactersSprites/Fantasy Warrior/Fall.png',
        death: '../assets/charactersSprites/Fantasy Warrior/Death.png',
    },

    medievalKing: {
        idle: '../assets/charactersSprites/Medieval King/Idle.png',
        attack1: '../assets/charactersSprites/Medieval King/Attack1.png',
        run: '../assets/charactersSprites/Medieval King/Run.png',
        jump: '../assets/charactersSprites/Medieval King/Jump.png',
        takehit: '../assets/charactersSprites/Medieval King/Take Hit.png',
        fall: '../assets/charactersSprites/Medieval King/Fall.png',
        death: '../assets/charactersSprites/Medieval King/Death.png',
    },
};

const characters = {
    evilWizard: {
        name: 'Evil Wizard',
        imgSrc: gameSprites.evilWizard.idle,
        maxFrames: 8,
        scale: 2.4,
        frameHold: 20,
        dimension: {
            width: 35,
            height: 57,
        },
        spriteOffset: {
            x: 108 * 1,
            y: 0,
        },
        attackBox: {
            offset: { dir: 1, y: 10 },
            width: 60,
            height: 25,
        },
        sprites: {
            idle: {
                imageSrc: gameSprites.evilWizard.idle,
                maxFrames: 8
            },
            run: {
                imageSrc: gameSprites.evilWizard.run,
                maxFrames: 8
            },
            jump: {
                imageSrc: gameSprites.evilWizard.jump,
                maxFrames: 2
            },
            fall: {
                imageSrc: gameSprites.evilWizard.fall,
                maxFrames: 2
            },
            attack1: {
                imageSrc: gameSprites.evilWizard.attack1,
                maxFrames: 8
            },
            takeHit: {
                imageSrc: gameSprites.evilWizard.takehit,
                maxFrames: 3
            },
            death: {
                imageSrc: gameSprites.evilWizard.death,
                maxFrames: 7
            }
        },
    },

    fantasyWarrior: {
        name: 'Fantasy Warrior',
        imgSrc: gameSprites.fantasyWarrior.idle,
        maxFrames: 10,
        scale: 3,
        frameHold: 20,
        dimension: {
            width: 27,
            height: 45,
        },
        spriteOffset: {
            x: 66,
            y: 0,
        },
        attackBox: {
            offset: { dir: 1, y: 10 },
            width: 35,
            height: 20,
        },
        sprites: {
            idle: {
                imageSrc: gameSprites.fantasyWarrior.idle,
                maxFrames: 10
            },
            run: {
                imageSrc: gameSprites.fantasyWarrior.run,
                maxFrames: 8
            },
            jump: {
                imageSrc: gameSprites.fantasyWarrior.jump,
                maxFrames: 3
            },
            fall: {
                imageSrc: gameSprites.fantasyWarrior.fall,
                maxFrames: 3
            },
            attack1: {
                imageSrc: gameSprites.fantasyWarrior.attack1,
                maxFrames: 7
            },
            takeHit: {
                imageSrc: gameSprites.fantasyWarrior.takehit,
                maxFrames: 3
            },
            death: {
                imageSrc: gameSprites.fantasyWarrior.death,
                maxFrames: 7
            }
        },
    },

    kojiro: {
        name: 'Kojiro Sasaki',
        imgSrc: gameSprites.kojiro.idle,
        maxFrames: 4,
        scale: 2.5,
        frameHold: 25,
        dimension: {
            width: 33,
            height: 56,
        },
        spriteOffset: {
            x: 81,
            y: 0,
        },
        attackBox: {
            offset: { dir: 1, y: 10 },
            width: 55,
            height: 25,
        },
        sprites: {
            idle: {
                imageSrc: gameSprites.kojiro.idle,
                maxFrames: 4
            },
            run: {
                imageSrc: gameSprites.kojiro.run,
                maxFrames: 8
            },
            jump: {
                imageSrc: gameSprites.kojiro.jump,
                maxFrames: 2
            },
            fall: {
                imageSrc: gameSprites.kojiro.fall,
                maxFrames: 2
            },
            attack1: {
                imageSrc: gameSprites.kojiro.attack1,
                maxFrames: 4
            },
            takeHit: {
                imageSrc: gameSprites.kojiro.takehit,
                maxFrames: 3
            },
            death: {
                imageSrc: gameSprites.kojiro.death,
                maxFrames: 7
            },
        },

    },

    medievalKing: {
        name: 'Medieval King',
        imgSrc: gameSprites.medievalKing.idle,
        maxFrames: 8,
        scale: 2.5,
        frameHold: 20,
        dimension: {
            width: 32,
            height: 55,
        },
        spriteOffset: {
            x: 64,
            y: 0,
        },
        attackBox: {
            offset: { dir: 1, y: 10 },
            width: 49,
            height: 22,
        },

        sprites: {
            idle: {
                imageSrc: gameSprites.medievalKing.idle,
                maxFrames: 8
            },
            run: {
                imageSrc: gameSprites.medievalKing.run,
                maxFrames: 8
            },
            jump: {
                imageSrc: gameSprites.medievalKing.jump,
                maxFrames: 2
            },
            fall: {
                imageSrc: gameSprites.medievalKing.fall,
                maxFrames: 2
            },
            attack1: {
                imageSrc: gameSprites.medievalKing.attack1,
                maxFrames: 4
            },
            takeHit: {
                imageSrc: gameSprites.medievalKing.takehit,
                maxFrames: 4
            },
            death: {
                imageSrc: gameSprites.medievalKing.death,
                maxFrames: 6
            }
        },
    },

    miyamoto: {
        name: 'Miyamoto Mushashi',
        imgSrc: gameSprites.miyamoto.idle,
        maxFrames: 8,
        scale: 2.5,
        frameHold: 15,
        dimension: {
            width: 32,
            height: 58,
        },
        spriteOffset: {
            x: 76,
            y: 0,
        },
        attackBox: {
            offset: { dir: 1, y: 10 },
            width: 55,
            height: 25,
        },
        sprites: {
            idle: {
                imageSrc: gameSprites.miyamoto.idle,
                maxFrames: 8
            },
            run: {
                imageSrc: gameSprites.miyamoto.run,
                maxFrames: 8
            },
            jump: {
                imageSrc: gameSprites.miyamoto.jump,
                maxFrames: 2
            },
            fall: {
                imageSrc: gameSprites.miyamoto.fall,
                maxFrames: 2
            },
            attack1: {
                imageSrc: gameSprites.miyamoto.attack1,
                maxFrames: 6
            },
            takeHit: {
                imageSrc: gameSprites.miyamoto.takehit,
                maxFrames: 4
            },
            death: {
                imageSrc: gameSprites.miyamoto.death,
                maxFrames: 6
            }
        },
    },
};


class Sprite {
    constructor({
        position,
        spriteOffset = { x: 0, y: 0, dir: 1 },
        imgSrc,
        scale = 1,
        maxFrames = 1,
        frameHold
    }) {
        this.position = position
        this.spriteOffset = spriteOffset
        this.image = new Image()
        this.image.src = imgSrc
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
                this.position.y - this.spriteOffset.y,           // Y-Position on the canvas to draw the image
                this.frameWidth * this.scale,                    // Width of the drawn image on the canvas
                this.image.height * this.scale                   // Height of the drawn image on the canvas
            )
        } else {
            ctx.save();
            ctx.scale(-1, 1);

            ctx.drawImage(
                this.image,
                (1 + this.currentFrame) * this.frameWidth, 0,                       // Starting position for clipping (x, y)
                (-1 * this.frameWidth), this.frameHeight,                           // Width and height of the clipped image
                (-1 * this.frameWidth) - this.position.x - this.spriteOffset.x + this.width,     // X-Position on the canvas to draw the image
                this.position.y - this.spriteOffset.y,                              // Y-Position on the canvas to draw the image 
                this.frameWidth * this.scale,                                       // Width of the drawn image on the canvas
                this.image.height * this.scale                                      // Height of the drawn image on the canvas
            );

            ctx.restore(); // Restore the last saved state
        }

        // draw a rectangle around the player
        if (this,this.frameWidth === gameCanvasWidth) {
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
        imgSrc,
        maxFrames = 1,
        scale = 1,
        frameHold,
        sprites,
        spriteOffset,
        playerOffset,
        dimension = {
            width: undefined,
            height: undefined
        },
        attackBox = {
            offset: 1,
            width: undefined,
            height: undefined
        },
    }) {
        super({
            position, // store the position of the player
            imgSrc,
            maxFrames,
            scale,
            frameHold,
            spriteOffset,
        })

        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameWidth = this.image.width / this.maxFrames
        this.sprites = sprites

        // Width and height of the player
        this.width = dimension.width * this.scale
        this.height = dimension.height * this.scale

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

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        if (!this.dead) {
            this.changeFrame()
        }

        if (this.spriteOffset.dir === 1) {
            this.attackBox.position.x = this.position.x + this.width
        }
        else {
            this.attackBox.position.x = this.position.x - this.attackBox.width
        }

        this.attackBox.position.y = this.position.y - this.attackBox.height + (this.image.height - this.attackBox.offset.y) * this.scale

        ctx.fillStyle = this.spriteOffset.dir === 1 ? '#FF000050' : '#00FF0050';

        ctx.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        );

        this.position.x += this.velocity.x
        if (Math.floor(this.position.y + this.image.height * this.scale + this.velocity.y) > landingHeight) {
            // if (Math.floor(this.position.y + this.height + this.velocity.y) > landingHeight) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
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
        this.health -= 10;

        if (this.health <= 0) {
            this.health = 0
            this.changeSprite('death')
        } else {
            this.changeSprite('takeHit')
        }
    }

    changeSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.currentFrame === this.sprites.death.maxFrames - 1) { this.dead = true }
            return
        }

        if (this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.maxFrames - 1) return
        if (this.image === this.sprites.takeHit.image && this.currentFrame < this.sprites.takeHit.maxFrames - 1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
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


let Sprites = {};
const totalCharacters = Object.keys(characters).length;


// Preload images
const preloadSprites = (spritesObject, callback) => {

    let loadedSprites = 0;
    const totalSprites = Object.keys(spritesObject).length;

    for (const spriteKey in spritesObject) {

        let images = {}
        let loadedImages = 0;
        const totalImages = Object.keys(spritesObject[spriteKey]).length;

        for (const imageKey in spritesObject[spriteKey]) {
            let newTime = Date.now();
            const img = new Image();
            img.src = spritesObject[spriteKey][imageKey];

            img.onload = () => {
                loadedImages++;
                console.log(`Image with key ${imageKey} is loaded in  ${Date.now() - newTime} ms. .`);
                if (loadedImages >= totalImages) {
                    loadedSprites++;
                    console.log(`Sprite with key ${spriteKey} is loaded.`);
                    if (loadedSprites >= totalSprites) {
                        callback(Sprites);
                    }
                }
            }

            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
            };

            images[imageKey] = img;
        }

        Sprites[spriteKey] = images;

    }
};