// DJ JW Soundboard - local audio pads
const pads = [
  { label: 'DJ JW TAG 01', icon: '🎙️', file: 'sounds/sound-01.mp3' },
  { label: 'DJ JW TAG 02', icon: '📣', file: 'sounds/sound-02.mp3' },
  { label: 'DJ JW TAG 03', icon: '🔥', file: 'sounds/sound-03.mp3' },
  { label: 'DJ JW TAG 04', icon: '🍪', file: 'sounds/sound-04.mp3' },
  { label: 'DJ JW TAG 05', icon: '🎂', file: 'sounds/sound-05.mp3' }
];

const board = document.querySelector('#soundboard');
const stopButton = document.querySelector('#stop-all');
const volumeSlider = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');
const nowPlaying = document.querySelector('#now-playing');
let volume = Number(volumeSlider?.value ?? 0.75);
const audioPool = new Set();


function playPad(pad, button) {
  const audio = new Audio(pad.file);
  audio.volume = volume;
  audioPool.add(audio);
  nowPlaying.textContent = `NOW PLAYING: ${pad.label}`;
  button.classList.add('playing');
  audio.addEventListener('ended', () => {
    audioPool.delete(audio);
    button.classList.remove('playing');
    if (audioPool.size === 0) nowPlaying.textContent = 'SELECT A PAD';
  }, { once: true });
  audio.addEventListener('error', () => {
    audioPool.delete(audio);
    button.classList.remove('playing');
    nowPlaying.textContent = `FILE NOT FOUND: ${pad.file}`;
    console.error('Could not load audio file:', pad.file);
  }, { once: true });
  audio.play().catch(err => {
    button.classList.remove('playing');
    nowPlaying.textContent = 'AUDIO FAILED TO PLAY';
    console.error(err);
  });
}


pads.forEach((pad, index) => {
  const button = document.createElement('button');
  button.className = 'sound-pad';
  button.type = 'button';
  button.innerHTML = `<span class="sound-icon">${pad.icon}</span><span class="sound-name">${pad.label}</span>`;
  button.setAttribute('aria-label', `Play ${pad.label}`);
  button.addEventListener('click', () => playPad(pad, button));
  board.appendChild(button);
});


function stopAll() {
  audioPool.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  audioPool.clear();
  document.querySelectorAll('.sound-pad').forEach(button => button.classList.remove('playing'));
  nowPlaying.textContent = 'ALL SOUNDS STOPPED';
}

stopButton.addEventListener('click', stopAll);
volumeSlider.addEventListener('input', event => {
  volume = Number(event.target.value);
  audioPool.forEach(audio => audio.volume = volume);
  volumeValue.textContent = `${Math.round(volume * 100)}%`;
});
