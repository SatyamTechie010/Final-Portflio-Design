var typed = new Typed("#element", {
    strings: ["Web Developer", "Graphics Designer", "Video Editor"],
    typeSpeed: 50
  });
 

  // Ai assitant code
  // Check browser support for SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; // Capture interim results
recognition.continuous = false;    // Stop recognition after each final result

// Accessing elements in DOM
const micBtn = document.getElementById('mic-btn');
const transcriptDisplay = document.getElementById('transcript');
const responseDisplay = document.getElementById('response');

// Start recognition when mic button is clicked
micBtn.addEventListener('click', () => {
    recognition.start();
    micBtn.style.backgroundColor = '#4CAF50'; // Change button color while listening
});

// Handle voice results
recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

    transcriptDisplay.textContent = `You said: ${transcript}`;
    transcriptDisplay.parentElement.style.display = 'block'; // Show transcript container

    if (event.results[0].isFinal) {
        handleVoiceCommand(transcript.toLowerCase()); // Handle the final command
    }
};

// Voice Command Handler
function handleVoiceCommand(command) {
    let responseText = "";

    if (command.includes('hello')) {
        responseText = "Hello, Satyam! How can I assist you today?";

    } else if (command.includes('what is the time')) {
        const now = new Date();
        responseText = `The time is ${now.getHours()} hours and ${now.getMinutes()} minutes.`;

    } else if (command.includes('open youtube')) {
        responseText = "Opening YouTube.";
        window.open('https://www.youtube.com', '_blank'); // Open YouTube in a new tab

    } else if (command.includes('open chrome')) {
        responseText = "Opening Google Chrome.";
        window.open('https://www.google.com', '_blank'); // Opens Google search

    } else if (command.includes('play song')) {
        responseText = "Playing a song on YouTube.";
        window.open('https://youtu.be/WRSeV_27z6k?si=vIdsNExWfapVJRaJ', '_blank'); // Rickroll!

    } else if (command.includes('search for')) {
        const searchQuery = command.replace('search for', '').trim();
        responseText = `Searching for ${searchQuery} on Google.`;
        window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank'); // Perform Google search

    } else {
        responseText = "Sorry, I didn't understand that command. Please try again.";
    }

    // Speak the response and display it
    speakResponse(responseText);
}

// Function to speak text and display it in the response section
function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);

    responseDisplay.textContent = `Jarvis: ${text}`;
    responseDisplay.parentElement.style.display = 'block'; // Show response container
}

// Change mic button color back when recognition ends
recognition.onend = () => {
    micBtn.style.backgroundColor = '#ff4c4c'; // Reset color after listening
};

// Handle speech recognition errors
recognition.onerror = (event) => {
    responseDisplay.textContent = `Jarvis: Sorry, I encountered an error (${event.error}).`;
    responseDisplay.parentElement.style.display = 'block';
};
 
