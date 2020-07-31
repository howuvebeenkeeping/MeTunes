import { addZero } from './supportScript.js';

export const audioPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const track = playlist[trackIndex];
        const wasPaused = audioPlayer.paused;

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (wasPaused) audioPlayer.pause();
        else audioPlayer.play();

        setTimeout(updateTime, 500);
    };

    const switchToNextTrack = () => {
        if (trackIndex === playlist.length - 1) trackIndex = 0;
        else trackIndex++;
        loadTrack();
    };

    const switchToPrevTrack = () => {
        if (trackIndex) trackIndex--;
        else trackIndex = playlist.length - 1;
        loadTrack();
    };

    const updateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioProgressTiming.style.width = progress + '%';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) audioPlayer.play();
            else audioPlayer.pause();

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            switchToPrevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            switchToNextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        switchToNextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', e => {
        const currentPosition = e.offsetX;
        const trackbarWidth = audioProgress.clientWidth;
        const progress = (currentPosition / trackbarWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    audioPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
}