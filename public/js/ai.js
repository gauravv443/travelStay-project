const chatBtn = document.getElementById("ai-chat-btn");
const chatBox = document.getElementById("ai-chat-box");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-message");
const input = document.getElementById("user-message");
const messages = document.getElementById("chat-messages");

chatBtn.onclick = () => {
    chatBox.style.display = "block";
};

closeChat.onclick = () => {
    chatBox.style.display = "none";
};

sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    messages.innerHTML += `<p><b>You:</b> ${text}</p>`;
    messages.innerHTML += `
<p id="typing"><b>🤖 AI:</b> Thinking...</p>
`;

messages.scrollTop = messages.scrollHeight;
    input.value = "";

    try {
        const res = await fetch("/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();
        document.getElementById("typing")?.remove();

        messages.innerHTML += `
<div>
    <b>AI:</b>
    <pre style="white-space: pre-wrap; font-family: Arial; margin:0;">
${data.reply}
    </pre>
</div>
`;
        messages.scrollTop = messages.scrollHeight;
        input.focus();

    } catch (err) {
        document.getElementById("typing")?.remove();
        messages.innerHTML += `<p><b>AI:</b> Something went wrong!</p>`;
    }
};

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
    }
});