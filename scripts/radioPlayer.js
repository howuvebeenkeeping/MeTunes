export const radioPlayerInit = () => {
    const radio =  document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const selectItem = element => {
        radioItem.forEach(item => item.classList.remove('select'));
        element.classList.add('select');
    };

    const toggleIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const chosen = target.closest('.radio-item');
        const title = chosen.querySelector('.radio-name').textContent;
        const urlImg = chosen.querySelector('.radio-img').src;

        radioHeaderBig.textContent = title;
        radioCoverImg.src = urlImg;

        selectItem(chosen);
        radioStop.disabled = false;
        
        audio.src = target.dataset.radioStation;
        audio.play();

        toggleIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();

        toggleIconPlay();
    });
}
