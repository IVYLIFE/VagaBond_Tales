console.log('constants.js loaded');

const frameHold      =  5;
const gravity        =  0.2;
const landingHeight  =  655;
const velocity_X     =  2.5;
const velocity_Y     =  8.5;

const gameCanvasWidth = 1400;
const gameCanvasHeight = 785;
const previewWidth = 220;
const previewHeight = 220;
const gameDuration = 900;



// Dom Elements
const canvas = document.getElementById('gameCanvas');
const player1PreviewCanvas = document.getElementById('player1PreviewCanvas');
const player2PreviewCanvas = document.getElementById('player2PreviewCanvas');

const ctx = canvas.getContext('2d');
const ctx1 = player1PreviewCanvas.getContext('2d');
const ctx2 = player2PreviewCanvas.getContext('2d');


const player1Name = document.querySelector('#p1');
const player2Name = document.querySelector('#p2');
const player1NamePreview = document.querySelector('#player1Name');
const player2NamePreview = document.querySelector('#player2Name');


// Controls
const player1Left = document.querySelector('.player1left');
const player1Right = document.querySelector('.player1right');
const player2Left = document.querySelector('.player2left');
const player2Right = document.querySelector('.player2right');



const gameInfo = document.querySelector('#top');
const clock = document.querySelector('#clock');

const gameOption = document.querySelector('.gameOption');
const result = document.querySelector('#result');
const endGameMessage = document.querySelector('#endGameMessage');

const player1Health = document.getElementById('player1Health');
const player2Health = document.getElementById('player2Health');

const playBtn = document.querySelector('#play');
const startGameBtn = document.querySelector('#startGame');
const playAgainBtn = document.querySelector('#playAgain');
const selectionContainer = document.querySelector('#selectionContainer')


canvas.width = gameCanvasWidth;
canvas.height = gameCanvasHeight;

player1PreviewCanvas.width = player2PreviewCanvas.width = previewWidth;
player1PreviewCanvas.height = player2PreviewCanvas.height = previewHeight;


const CONSTANTS = {
    frameHold,
    gravity,
    landingHeight,
    velocity_X,
    velocity_Y,

    gameCanvasWidth,
    gameCanvasHeight,
    previewWidth,
    previewHeight,
    gameDuration,
}



export{
    ctx,
    canvas,
    gameCanvasWidth,
    gameCanvasHeight,

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

    playBtn,
    startGameBtn,
    playAgainBtn,
    selectionContainer,

    player1Health,
    player2Health,

    gameInfo,
    clock,
    gameOption,
    result,

    CONSTANTS,

}
