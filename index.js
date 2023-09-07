const startButton = document.getElementById("listen-btn");
const indicatorText = document.getElementById("text");
const output = document.getElementById("output");
const recognition = new webkitSpeechRecognition(); // Create a SpeechRecognition instance

recognition.continuous = true; // Continuous listening
recognition.lang = "en-US"; // Set the language

// Event handler when speech recognition starts
recognition.onstart = () => {
  indicatorText.textContent = "Listening...";
};

// Event handler when speech is recognized
recognition.onresult = (event) => {
  const result = event.results[event.results.length - 1][0].transcript;
  if(output.innerText == ''){
    output.textContent = result[0].toUpperCase() + result.slice(1);
  } else {
    output.textContent += ",  " + result;

    // features format text base on words used
    // words like 'new line' or 'fullstop' and 'comma'.
  }
};

// Event handler when the recognition ends (e.g., the user stops speaking)
recognition.onend = () => {
  indicatorText.textContent = "Click the button to start speaking";
};

// Event handler when an error occurs
recognition.onerror = (event) => {
  console.error(event.error);
};

let started = false;

// Start listening when the button is clicked
startButton.addEventListener("click", () => {
  if (started) {
    recognition.stop();
    started = false
    startButton.classList.remove('recording')
    startButton.ariaLabel = 'Click to start speaking'
  } else {
    recognition.start();
    started = true
    startButton.ariaLabel = 'Listening to your message'
    startButton.classList.add('recording')
  }
});
stopButton.addEventListener("click", () => {
  try {
    recognition.stop(); // Stop recognition if it's currently running
  } catch (error) {
    console.error("Speech recognition not supported in your browser.");
  }
});
