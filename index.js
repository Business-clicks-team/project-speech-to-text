const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
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
  output.textContent = result;
};

// Event handler when the recognition ends (e.g., the user stops speaking)
recognition.onend = () => {
  indicatorText.textContent = "Start Listening";
};

// Event handler when an error occurs
recognition.onerror = (event) => {
  console.error(event.error);
};

// Start listening when the button is clicked
startButton.addEventListener("click", () => {
  if (recognition.start) {
    recognition.start();
  } else {
    console.error("Speech recognition not supported in your browser.");
  }
});
stopButton.addEventListener("click", () => {
  try {
    recognition.stop(); // Stop recognition if it's currently running
  } catch (error) {
    console.error("Speech recognition not supported in your browser.");
  }
});
