const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio("tunes/a.wav"); // By default, audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // Passing audio src based on key pressed
    audio.play(); // Playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // Getting clicked key element
    clickedKey.classList.add("active"); // Adding active class t0 the clicked key elements 
    
    setTimeout(() => { // removing active class after 150ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // Adding data-key value to the allKeys array
    // Calling playTune function with passing data-key value ass an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // Passing the range slider value as an audio volume
}

const showHideKeys = () => {
    // Toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // If the pressed key is in the allKeys array, only call the playTune function
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);