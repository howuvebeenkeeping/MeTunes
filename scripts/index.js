import { radioPlayerInit } from './radioPlayer.js';
import { audioPlayerInit } from './audioPlayer.js';
import videoPlayerInit from './videoPlayer.js';    // можно экспортировать через default

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const diactivatePlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active')); 
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    diactivatePlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));

radioPlayerInit();
videoPlayerInit();
audioPlayerInit();