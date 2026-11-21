// DJ JW SOUND BOARD

const sounds = [
  {
    name: "DJ JW INTRO",
    file: "sounds/sound1.mp3",
    icon: "🎤"
  },
  {
    name: "IF IT AIN'T DJ JW",
    file: "sounds/sound2.mp3",
    icon: "🗣️"
  },
  {
    name: "DJ JW IN THE HOUSE",
    file: "sounds/sound3.mp3",
    icon: "🔥"
  },
  {
    name: "CRACKER",
    file: "sounds/sound4.mp3",
    icon: "🍘"
  },
  {
    name: "BIRTHDAY PARTIES",
    file: "sounds/sound5.mp3",
    icon: "🎂"
  }
];

let activeSounds = [];
let volume = 0.7;

// PLAY A SOUND
function playSound(file, name) {
  const audio = new Audio(file);
  audio.volume = volume;

  activeSounds.push(audio);

  audio.play().catch(error => {
    console.error("Audio failed to play:", error);
  });

  audio.onended = () => {
    activeSounds = activeSounds.filter(sound => sound !== audio);
  };

  console.log("Playing:", name);
}

// STOP ALL SOUNDS
function stopAll() {
  activeSounds.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  activeSounds = [];
}

// VOLUME CONTROL
function setVolume(value) {
  volume = Number(value);

  activeSounds.forEach(audio => {
    audio.volume = volume;
  });
}

// CREATE SOUND BUTTONS
function createSoundButtons() {
  const container = document.getElementById("soundboard");

  if (!container) {
    console.error("Soundboard container not found!");
    return;
  }

  container.innerHTML = "";

  sounds.forEach(sound => {
    const button = document.createElement("button");

    button.className = "sound-pad";
    button.innerHTML = `
      <span class="sound-icon">${sound.icon}</span>
      <span class="sound-name">${sound.name}</span>
    `;

    button.addEventListener("click", () => {
      playSound(sound.file, sound.name);

      button.classList.add("playing");

      setTimeout(() => {
        button.classList.remove("playing");
      }, 300);
    });

    container.appendChild(button);
  });
}

// INITIALIZE
document.addEventListener("DOMContentLoaded", () => {
  createSoundButtons();

  const volumeSlider = document.getElementById("volume");

  if (volumeSlider) {
    volumeSlider.addEventListener("input", event => {
      setVolume(event.target.value);
    });
  }

  const stopButton = document.getElementById("stop-all");

  if (stopButton) {
    stopButton.addEventListener("click", stopAll);
  }
});
