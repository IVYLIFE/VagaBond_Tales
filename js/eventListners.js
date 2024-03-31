console.log('eventListners.js loaded')



import {
    playBtn,
    startGameBtn,
    playAgainBtn,
    selectionContainer,
} from './constants.js';



import {
    startGame,
    showPlayers,
    isGameStarted,
    selectPlayers,
    count1,
    count2,
} from './utils.js';


import {
    handleKeyDown,
    handleKeyUp,
} from './game.js';


// Call startGame() 10 seconds after the page loads
// setTimeout(() => {
//     console.log('1 seconds have passed');
//     startGame()
// }, 1000);


playBtn.addEventListener('click', () => {
    playBtn.classList.add('hidden');
    console.log('Play Button Clicked');
    selectionContainer.classList.remove('hidden');
    selectPlayers()
})

startGameBtn.addEventListener('click', startGame)

playAgainBtn.addEventListener('click', () => {
    window.location.reload();
    showPlayers = false
})

document.addEventListener('keydown', (e) => {
    if (isGameStarted) { handleKeyDown(e); }
});

document.addEventListener('keyup', (e) => {
    if (isGameStarted) { handleKeyUp(e); }
});




// Create sprites using preloaded images
// window.onload = function () {

// };