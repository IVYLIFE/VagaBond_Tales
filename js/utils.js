console.log('utils.js loaded')

// ==================== Variables ===================== //

let gameDuration = 900
let countDownId
let isGameStarted = false
let showPlayers = false
let animationId

const gameStatus = document.querySelector('.gameStatus')
const playersName = document.querySelector('.playersName')
const clock = document.querySelector('#clock')

const startMessage = document.querySelector('#startGameMessage')
const result = document.querySelector('#result')
const endMessage = document.querySelector('#endGameMessage')

const player1Health = document.querySelector('#player1 .healthBar')
const player2Health = document.querySelector('#player2 .healthBar')

// ==================================================== //
// ==================================================== //
// ==================================================== //

class Sprite {
    constructor({
        position,
        spriteOffset = { x: 0, y: 0 },
        imgSrc,
        animate = false,
        scale = 1,
        maxFrames = 1,
        frameHold
    }) {
        this.position = position
        this.spriteOffset = spriteOffset
        this.image = new Image()
        this.image.src = imgSrc
        this.animate = animate
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = frameHold
        this.frameWidth = this.image.width / this.maxFrames
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frameWidth * this.currentFrame,
            0,
            this.frameWidth,
            this.image.height,
            this.position.x - this.spriteOffset.x,
            this.position.y - this.spriteOffset.y,
            this.frameWidth * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
        this.changeFrame()
    }

    changeFrame() {
        this.frameElapsed++

        if (this.frameElapsed % this.frameHold == 0) {
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
        spriteOffset,
        imgSrc,
        animate = false,
        scale = 1,
        maxFrames = 1,
        frameHold,
        sprites,
        velocity,
        attackOffset,
        playerOffset,
        color = 'blue'
    }) {
        super({
            position, // store the position of the player
            spriteOffset,
            imgSrc,
            animate,
            scale,
            maxFrames,
            frameHold
        })

        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameWidth = this.image.width / this.maxFrames
        this.sprites = sprites
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        this.width = 35 // store the width of the player
        this.height = 160 // store the height of the player

        this.velocity = velocity // store the velocity of the player
        this.attackOffset = attackOffset // store the attackOffset of the player [ 1 => Right, -1 => Left]
        this.playerOffset = playerOffset
        this.color = color // store the color of the player

        this.doubleJump = false // checks if the player can double jump or not
        this.lastMove // store the last move in horizontal direction
        this.move_H = [] // store the last two horizontal moves
        this.jumpCount = 0 // store the number of jumps

        this.isAttacking // checks if the player is attacking or not
        this.health = 100 // store the health of the player
        this.dead = false
        this.attackBox = {
            width: 100,
            height: 25,
            position: {
                x: this.position.x,
                y: this.position.y
            }
        }
    }

    update() {
        this.draw()
        this.changeFrame()

        // this.attackBox.position.x = this.attackOffset === 1 ? this.position.x : this.position.x - this.attackBox.width + this.width
        // this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        if (Math.floor(this.position.y + this.height + this.velocity.y) > landingHeight) {
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

const gameStart = () => {
    startMessage.classList.add('hidden')
    gameStatus.classList.remove('hidden')
    playersName.classList.remove('hidden')

    player1Health.style.width = `${player1.health}%`
    player2Health.style.width = `${player2.health}%`

    isGameStarted = true
    showPlayers = true
    countDown()
    startAnimation()
}

const countDown = () => {
    if (isGameStarted) {
        clock.textContent = gameDuration

        if (gameDuration <= 0) {
            gameOver({ player: player1, enemy: player2, countDownId })
        } else {
            gameDuration--
            countDownId = setTimeout(countDown, 1000)
        }
    }
}

const gameOver = ({ player, enemy, countDownId }) => {
    isGameStarted = false
    player.velocity.x = 0
    enemy.velocity.x = 0

    clearTimeout(countDownId)
    cancelAnimationFrame(animationId)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)

    if (player.health > enemy.health) {
        result.textContent = 'Player One Wins'
    } else if (player.health < enemy.health) {
        result.textContent = 'Player Two Wins'
    } else {
        result.textContent = 'Draw'
    }
    endMessage.classList.remove('hidden')
}

const collision = ({ player, enemy }) => {
    return (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height
    )
}

const changeAttackDirection = ({ player, enemy }) => {
    if (player.position.x > enemy.position.x + enemy.width) {
        player.attackOffset = -1 // Attack in Left Direction
        player.playerOffset = -1
    } else {
        player.attackOffset = 1 // Attack in Right Direction
        player.playerOffset = 1
    }
}

const playerStanding = (player) => {
    if ( Math.floor(player.velocity.y + player.position.y + player.height) === landingHeight ) {
        player.jumpCount = 0
    }
}
