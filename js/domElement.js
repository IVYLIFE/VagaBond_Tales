console.log('domElement.js loaded')

const canvas = document.getElementById('gameCanvas');
const player1PreviewCanvas = document.getElementById('player1PreviewCanvas');
const player2PreviewCanvas = document.getElementById('player2PreviewCanvas');

const ctx = canvas.getContext('2d');
const ctx1 = player1PreviewCanvas.getContext('2d');
const ctx2 = player2PreviewCanvas.getContext('2d');


const gameCanvasWidth = 1400;
const gameCanvasHeight = 785;
const previewWidth = 220;
const previewHeight = 220;


canvas.width = gameCanvasWidth;
canvas.height = gameCanvasHeight;

player1PreviewCanvas.width = previewWidth;
player1PreviewCanvas.height = previewHeight;

player2PreviewCanvas.width = previewWidth;
player2PreviewCanvas.height = previewHeight;




let player1Name = document.querySelector('#p1');
let player2Name = document.querySelector('#p2');
let player1NamePreview = document.querySelector('#player1Name');
let player2NamePreview = document.querySelector('#player2Name');


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

const playGame = document.querySelector('#playGame');
const startGameMessage = document.querySelector('#startGameMessage')
const startGame = document.querySelector('#startGame');
const playAgain = document.querySelector('#playAgain');



const frameHold = 10;
const gravity = 0.2;
const landingHeight = 655;
const velocity_X = 2.5;
const velocity_Y = 8.5;

let player1;
let player2;
let backGround;
let shop;