const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const modelSelect = document.getElementById('model-select');

sendButton.addEventListener('click', async () => {
    const message = userInput.value;
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    const model = modelSelect.value;
    const response = await fetch('https://api.groq.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
        },
        body: JSON.stringify({ model, prompt: message })
    });

    const data = await response.json();
    appendMessage('assistant', data.response);
});

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
