const startButton = document.getElementById("listen-btn");
const sendMailButton = document.getElementById("send-mail-btn");
const modal = document.getElementById("modal");
const form = document.forms[0];
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
  if (output.innerText == "") {
    output.innerHTML = result[0].toUpperCase() + result.slice(1) + ",";
  } else {
    output.innerHTML += " <br> " + result;
    // output.textContent += ", " + result;
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
    started = false;
    startButton.classList.remove("recording");
    startButton.ariaLabel = "Click to start speaking";
  } else if (navigator.onLine) {
    recognition.start();
    started = true;
    startButton.ariaLabel = "Listening to your message";
    startButton.classList.add("recording");
  } else {
    startButton.ariaLabel = "No network, please connect to the Internet";
    indicatorText.textContent = "No network, please connect to the Internet";
  }
});

// mail sending button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

sendMailButton.addEventListener("click", () => {
  console.log(
    form.elements["mail receiver"].value,
    form.elements["mail subject"].value,
    output.innerText
  );

  location.href = `mailto:${form.elements["mail receiver"].value}?subject=${form.elements["mail subject"].value}&body=${output.innerText}`;
});
