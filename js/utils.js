console.log('utils.js loaded')

import { animationId, handleKeyDown, handleKeyUp, startAnimation } from './game.js';

import {
    ctx1,
    ctx2,

    player1Name,
    player2Name,
    player1NamePreview,
    player2NamePreview,
    player1Left,
    player1Right,
    player2Left,
    player2Right,

    selectionContainer,

    player1Health,
    player2Health,

    gameInfo,
    clock,
    gameOption,
    result,

    CONSTANTS,
    endGameMessage
} from './constants.js';

import {
    Sprite,
    Player,
    gameSprites,
    characters,
    preloadSprites,
} from './gameElements.js'


// ==================== Variables ===================== //
let count1 = 2;
let count2 = 1;
let length = characters.numbers;
let startTime = Date.now();

let isGameStarted = false;
let showPlayers = false;
let countDownId;


if (count1 > length - 1) { count1 = 0 }
if (count2 > length - 1) { count2 = 0 }

let player1PreviewData = {};
let player2PreviewData = {};

let gameDuration = CONSTANTS.gameDuration;



let BackGround;
let Shop;
let Player1;
let Player2;
const Players = [];

preloadSprites(gameSprites, (sprites) => {
    console.log(`\n\nAll sprites are preLoaded in ${Date.now() - startTime} ms.\n`);
    console.log('Loaded Sprites : ', sprites, '\n\n');

    // Create game objects
    BackGround = new Sprite({
        position: { x: 0, y: 0 },
        img: sprites.gameObjects.background,
    })

    Shop = new Sprite({
        position: { x: 880, y: CONSTANTS.landingHeight - 447 },
        img: sprites.gameObjects.shop,
        scale: 3.5,
        maxFrames: 6,
        frameHold: 10,
    })


    console.log('BackGround : ', BackGround);
    console.log('Shop : ', Shop);
    startAnimation();
});



const showPlayerInfo = (player1, player2) => {
    player1Name.innerHTML = player1.name;
    player2Name.innerHTML = player2.name;

    player1NamePreview.innerHTML = `${player1.name}`;
    player2NamePreview.innerHTML = `${player2.name}`;

    // Canvas Dimension : ${previewWidth} x ${CONSTANTS.previewHeight} <br>
    // Sprite Dimension : ${player1.frameWidth} x ${player1.frameHeight} <br>
    // Sprite Offset : ${player1.spriteOffset.x}, ${player1.spriteOffset.y} <br>
    // Scale : ${player1.scale} <br>
    // Scale2 : ${player1.scale2}
}

const selectPlayer = (count) => {
    count = (count + length) % length;
    let character = Object.keys(characters.list)[count];
    let characterData = characters.list[character];
    let img = characterData.img;

    let data = {
        name: characterData.name,
        image: img,
        scale: characterData.scale,
        scale2: characterData.scale2,
        maxFrame: characterData.maxFrames,
        spriteOffset: { ...characterData.spriteOffset },
        currentFrame: 0,
        frameElapsed: 0,
    };

    data.frameWidth = img.width / data.maxFrame;
    data.frameHeight = img.height;

    return data;
};

const selectPlayers = (count1, count2) => {
    player1PreviewData = selectPlayer(count1);
    player2PreviewData = selectPlayer(count2);
    console.log(player1PreviewData)
    console.log(player2PreviewData)

    showPlayerInfo(player1PreviewData, player2PreviewData);

    player1Left.addEventListener('click', () => {
        count1 = (count1 - 1 + length) % length;
        player1PreviewData = selectPlayer(count1);
        showPlayerInfo(player1PreviewData, player2PreviewData);
    });

    player1Right.addEventListener('click', () => {
        count1 = (count1 + 1) % length;
        player1PreviewData = selectPlayer(count1);
        showPlayerInfo(player1PreviewData, player2PreviewData);
    });

    player2Left.addEventListener('click', () => {
        count2 = (count2 - 1 + length) % length;
        player2PreviewData = selectPlayer(count2);
        showPlayerInfo(player1PreviewData, player2PreviewData);
    });

    player2Right.addEventListener('click', () => {
        count2 = (count2 + 1) % length;
        player2PreviewData = selectPlayer(count2);
        showPlayerInfo(player1PreviewData, player2PreviewData);
    });

    const draw = (ctx, sprite) => {
        ctx.drawImage(
            sprite.image,
            sprite.currentFrame * sprite.frameWidth, 0,
            sprite.frameWidth, sprite.frameHeight,
            (CONSTANTS.previewWidth - sprite.frameWidth * sprite.scale) / 2,
            (CONSTANTS.previewHeight - sprite.frameHeight * sprite.scale),
            sprite.frameWidth * sprite.scale,
            sprite.frameHeight * sprite.scale,

        );
    };

    const changeFrame = (img) => {
        img.frameElapsed++;

        if (img.frameElapsed % CONSTANTS.frameHold === 0) {
            if (img.currentFrame < img.maxFrame - 1) {
                img.currentFrame++;
            } else {
                img.currentFrame = 0;
            }
        }
    };

    const startAnimation = () => {
        ctx1.clearRect(0, 0, player1PreviewCanvas.width, player1PreviewCanvas.height);
        ctx2.clearRect(0, 0, player2PreviewCanvas.width, player2PreviewCanvas.height);

        draw(ctx1, player1PreviewData);
        draw(ctx2, player2PreviewData);

        changeFrame(player1PreviewData);
        changeFrame(player2PreviewData);
    };

    function animate() {
        startAnimation();
        requestAnimationFrame(animate);
    }

    animate();
}


const createPlayers = (count1, count2) => {

    let char1 = Object.keys(characters.list)[count1];
    let char2 = Object.keys(characters.list)[count2];

    const player1 = new Player({
        ...characters.list[char1], // Spread the properties of 'miyamoto'
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        spriteOffset: {
            x: Math.floor(characters.list[char1].spriteOffset.x * characters.list[char1].scale),
            y: Math.floor(characters.list[char1].spriteOffset.y * characters.list[char1].scale),
            dir: 1
        },
        playerOffset: 1,
    });

    const player2 = new Player({
        ...characters.list[char2], // Spread the properties of 'miyamoto'
        position: { x: 1200, y: 0 },
        velocity: { x: 0, y: 0 },
        spriteOffset: {
            x: characters.list[char2].spriteOffset.x * characters.list[char2].scale,
            y: characters.list[char2].spriteOffset.y * characters.list[char2].scale,
            dir: -1
        },
        playerOffset: -1,
    },);

    Player1 = player1;
    Player2 = player2;
    Players.push(Player1, Player2);
    console.log('Player1 : ', Player1);
    console.log('Player2 : ', Player2);
};

const startGame = () => {
    selectionContainer.classList.add('hidden')
    gameOption.classList.add('hidden')
    gameInfo.classList.remove('hidden')

    createPlayers(count1, count2);

    player1Health.style.width = `${Player1.health}%`
    player2Health.style.width = `${Player2.health}%`

    isGameStarted = true
    showPlayers = true
    countDown()
    startAnimation()
};

const countDown = () => {
    if (isGameStarted) {
        clock.textContent = gameDuration

        if (gameDuration <= 0) {
            gameOver({ player: Player1, enemy: Player2, countDownId })
        } else {
            gameDuration--
            countDownId = setTimeout(countDown, 1000)
        }
    }
};

const gameOver = ({ player, enemy, countDownId }) => {
    isGameStarted = false
    player.velocity.x = 0
    enemy.velocity.x = 0

    clearTimeout(countDownId)
    cancelAnimationFrame(animationId)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)

    player.changeSprite('idle')
    enemy.changeSprite('idle')
    
    if (player.health > enemy.health) {
        result.textContent = 'Player One Wins'
    } else if (player.health < enemy.health) {
        result.textContent = 'Player Two Wins'
    } else {
        result.textContent = 'Draw'
    }

    if(player.health <= 0) {
        player.changeSprite('death')
    } else if(enemy.health <= 0) {
        enemy.changeSprite('death')
    }


    gameOption.classList.remove('hidden')
    endGameMessage.classList.remove('hidden')
};

const collision = ({ player, enemy }) => {
    let isColliding = player.attackBox.position.x >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height
    console.log('Collision Happening : ', isColliding)
    return isColliding
};

const changeDirection = ({ player, enemy }) => {
    if(player.position.x > enemy.position.x) {
        player.playerOffset = -1
        player.spriteOffset.dir = -1
    } else if (player.position.x < enemy.position.x) {
        player.playerOffset = 1
        player.spriteOffset.dir = 1
    }
}

const playerStanding = (player) => {
    if (Math.floor(
        player.velocity.y + 
        player.position.y + 
        player.image.height * 
        player.scale) === CONSTANTS.landingHeight
    ) {
        player.jumpCount = 0
    }
};


export {
    count1,
    count2,
    showPlayers,
    isGameStarted,
    countDownId,

    startGame,
    selectPlayers,

    showPlayerInfo,
    collision,
    changeDirection,
    playerStanding,
    gameOver,

    BackGround,
    Shop,
    Player1,
    Player2,
}