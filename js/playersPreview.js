const player1Preview = document.querySelector('#player1Preview');
const player2Preview = document.querySelector('#player2Preview');

let player1NamePreview = document.querySelector('#player1Name');
let player2NamePreview = document.querySelector('#player2Name');

let player1Name = document.querySelector('.playersName .p1');
let player2Name = document.querySelector('.playersName .p2');

const ctx1 = player1Preview.getContext('2d');
const ctx2 = player2Preview.getContext('2d');

const previewWidth = 220;
const previewHeight = 220;
const frameHold = 10;


player1Preview.width = previewWidth;
player1Preview.height = previewHeight;

player2Preview.width = previewWidth;
player2Preview.height = previewHeight;

// Controls
const player1Left = document.querySelector('.player1left');
const player1Right = document.querySelector('.player1right');
const player2Left = document.querySelector('.player2left');
const player2Right = document.querySelector('.player2right');


const playerSpritesPreview = {
    'miyamoto': {
        src: '../assets/charactersSprites/Miyamoto Mushashi/Idle.png',
        maxFrames: 8,
        offset : {
            x : -90,
            y : -50,
        },
        scale : 2,
        name : 'Miyamoto Mushashi',
    },

    'kojiro': {
        src: '../assets/charactersSprites/Kojiro Sasaki/Idle.png',
        maxFrames: 4,
        offset : {
            x : -90,
            y : -60,
        },
        scale : 2,
        name : 'Kojiro Sasaki',
    },

    'evilWizard': {
        src: '../assets/charactersSprites/Evil Wizard/Idle.png',
        maxFrames: 8,
        offset : {
            x : -140,
            y : -140,
        },
        scale : 2,
        name : 'Evil Wizard',
    },

    'fantasyWarrior': {
        src: '../assets/charactersSprites/Fantasy Warrior/Idle.png',
        maxFrames: 10,
        offset : {
            x : -85,
            y : -50,
        },
        scale : 2.4,
        name : 'Fantasy Warrior',
    },

    'medievalKing': {
        src: '../assets/charactersSprites/Medieval King/Idle.png',
        maxFrames: 8,
        offset : {
            x : -80,
            y : -45,
        },
        scale : 2.3,
        name : 'Medieval King',
    },
}


let previewSprites;
let count1 = 0;
let count2 =  1;
let player1PreviewData = {};
let player2PreviewData = {};
let length = Object.keys(playerSpritesPreview).length;


// Preload previewSprites and start animation after previewSprites are preloaded
const preloadImages = async () => {
    const promises = Object.values(playerSpritesPreview).map(async (sprite) => {
        const img = new Image();
        img.src = sprite.src;
        await new Promise((resolve) => (img.onload = resolve));
        return img;
    });

    previewSprites = await Promise.all(promises);
    return previewSprites;
};

const selectPlayer = (count) => {
    count = (count + length) % length;

    let sprite = Object.keys(playerSpritesPreview)[count];
    let img = previewSprites[count];

    let data = {
        currentFrame: 0,
        frameElapsed: 0,
        image: img,
        maxFrame: playerSpritesPreview[sprite].maxFrames,
        x: playerSpritesPreview[sprite].offset.x,
        y: playerSpritesPreview[sprite].offset.y,
        scale: playerSpritesPreview[sprite].scale,
        name: playerSpritesPreview[sprite].name,
    };

    data.frameWidth = img.width / data.maxFrame;
    data.frameHeight = img.height;

    return data;
};

const updatePlayerData = (count, playerData, images) => {
    count = (count + length) % length;

    let newData = selectPlayer(count, images);
    playerData.currentFrame = newData.currentFrame;
    playerData.frameElapsed = newData.frameElapsed;
    playerData.image = newData.image;
    playerData.maxFrame = newData.maxFrame;
    playerData.x = newData.x;
    playerData.y = newData.y;
    playerData.scale = newData.scale;
    playerData.frameWidth = newData.frameWidth;
    playerData.frameHeight = newData.frameHeight;
    playerData.name = newData.name;
};


const showPlayer = ( player1, player2 ) => {

    player1NamePreview.innerHTML = player1.name;
    player2NamePreview.innerHTML = player2.name;

    player1Name.innerHTML = player1.name;
    player2Name.innerHTML = player2.name;

    localStorage.setItem('player1', count1);
    localStorage.setItem('player2', count2);

    console.log("Player 1 Data:", player1);
    console.log("Player 2 Data:", player2);
    console.log('\n\n\n');
}



// Main function
preloadImages().then((loadedImages) => {
    previewSprites = loadedImages; // Update the global previewSprites variable

    player1PreviewData = selectPlayer(count1);
    player2PreviewData = selectPlayer(count2);

    showPlayer(player1PreviewData, player2PreviewData);

    const draw = (ctx, sprite) => {
        ctx.drawImage(
            sprite.image,
            sprite.currentFrame * sprite.frameWidth, 0,
            sprite.frameWidth, sprite.frameHeight,
            sprite.x, sprite.y,
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
        ctx1.clearRect(0, 0, player1Preview.width, player1Preview.height);
        ctx2.clearRect(0, 0, player2Preview.width, player2Preview.height);

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

    player1Left.addEventListener('click', () => {
        count1 = (count1 - 1 + length) % length;
        updatePlayerData(count1, player1PreviewData);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player1Right.addEventListener('click', () => {
        count1 = (count1 + 1) % length;
        updatePlayerData(count1, player1PreviewData);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player2Left.addEventListener('click', () => {
        count2 = (count2 - 1 + length) % length;
        updatePlayerData(count2, player2PreviewData);
        showPlayer(player1PreviewData, player2PreviewData);
    });

    player2Right.addEventListener('click', () => {
        count2 = (count2 + 1) % length;
        updatePlayerData(count2, player2PreviewData);
        showPlayer(player1PreviewData, player2PreviewData);
    });
});

