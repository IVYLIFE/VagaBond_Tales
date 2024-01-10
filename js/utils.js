console.log('utils.js loaded')

// ==================== Variables ===================== //

let gameDuration = 900;
let countDownId;
let isGameStarted = false;
let showPlayers = false;
let animationId;

let player1PreviewData = {};
let player2PreviewData = {};
let length = totalCharacters


const selectPlayer = (count) => {
    count = (count + length) % length;
    let character = Object.keys(characters)[count];
    let characterData = characters[character];
    let imgSrc = characterData.imgSrc;
    let img = new Image();
    img.src = imgSrc;

    let data = {
        name: characterData.name,
        image: img,
        scale: characterData.scale,
        maxFrame: characterData.maxFrames,
        spriteOffset: { ...characterData.spriteOffset },
        currentFrame: 0,
        frameElapsed: 0,
    };

    data.frameWidth = img.width / data.maxFrame;
    data.frameHeight = img.height;

    return data;
};


const showPlayer = (player1, player2) => {
    player1NamePreview.innerHTML = player1.name;
    player2NamePreview.innerHTML = player2.name;

    player1Name.innerHTML = player1.name;
    player2Name.innerHTML = player2.name;
}

const playerSelection = (count1, count2) => {

    player1PreviewData = selectPlayer(count1);
    player2PreviewData = selectPlayer(count2);
    showPlayer(player1PreviewData, player2PreviewData);
    console.log(player1PreviewData)
    console.log(player2PreviewData)

    player1Left.addEventListener('click', () => {
        count1 = (count1 - 1 + length) % length;
        player1PreviewData = selectPlayer(count1);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player1Right.addEventListener('click', () => {
        count1 = (count1 + 1) % length;
        player1PreviewData = selectPlayer(count1);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player2Left.addEventListener('click', () => {
        count2 = (count2 - 1 + length) % length;
        player2PreviewData = selectPlayer(count2);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player2Right.addEventListener('click', () => {
        count2 = (count2 + 1) % length;
        player2PreviewData = selectPlayer(count2);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    const draw = (ctx, sprite) => {
        ctx.drawImage(
            sprite.image,
            sprite.currentFrame * sprite.frameWidth, 0,
            sprite.frameWidth, sprite.frameHeight,
            // 0,0,
            (previewWidth / 2) - (sprite.frameWidth * (sprite.scale / 2)), (previewHeight / 2) - (sprite.frameHeight * (sprite.scale / 2)),
            sprite.frameWidth * sprite.scale,
            sprite.frameHeight * sprite.scale,
        );
    };

    const changeFrame = (img) => {
        img.frameElapsed++;

        if (img.frameElapsed % frameHold === 0) {
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

const createPlayers = (idx1, idx2) => {

    char1 = Object.keys(characters)[idx1];
    char2 = Object.keys(characters)[idx2];

    player1 = new Player({
        ...characters[char1], // Spread the properties of 'miyamoto'
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        spriteOffset: {
            x: characters[char1].spriteOffset.x * characters[char1].scale,
            y: characters[char1].spriteOffset.y * characters[char1].scale,
            dir: 1
        },
        playerOffset: 1,
    });

    player2 = new Player({
        ...characters[char2], // Spread the properties of 'miyamoto'
        position: { x: 1200, y: 0 },
        velocity: { x: 0, y: 0 },
        spriteOffset: {
            x: characters[char1].spriteOffset.x * characters[char1].scale,
            y: characters[char1].spriteOffset.y * characters[char1].scale,
            dir: -1
        },
        playerOffset: -1,
    },);

};

const gameStart = () => {
    startGameMessage.classList.add('hidden')
    gameOption.classList.add('hidden')
    gameInfo.classList.remove('hidden')

    createPlayers(count1, count2);
    console.log(count1, count2)
    console.log(player1, player2);

    player1Health.style.width = `${player1.health}%`
    player2Health.style.width = `${player2.health}%`

    isGameStarted = true
    showPlayers = true
    countDown()
    startAnimation()
};

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
};

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

    gameOption.classList.remove('hidden')
    endGameMessage.classList.remove('hidden')
};

const collision = ({ player, enemy }) => {
    let isColliding = player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height
    console.log('Collision Happening : ', isColliding)
    return (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height
    )
};

const changeDirection = ({ player, enemy }) => {
    if (player.position.x > enemy.position.x + enemy.width) {
        player.playerOffset = -1
        player.spriteOffset.dir = -1
    } else {
        player.spriteOffset.dir = 1
        player.playerOffset = 1
    }
};

const playerStanding = (player) => {
    if (Math.floor(player.velocity.y + player.position.y + player.image.height * player.scale) === landingHeight) {
        player.jumpCount = 0
    }
};



startGame.addEventListener('click', gameStart)

playAgain.addEventListener('click', () => {
    window.location.reload();
    showPlayers = false
})
