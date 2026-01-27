import "./style.css";

const app = document.querySelector("#app");

// 1. Render the landing page UI
app.innerHTML = `
  <div id="title">
    <p>Welcome to</p>
    <h1>COD'BLAST</h1>
  </div>
  <p id="subtitle">Current highscore: 0</p>
  <button id="start-button">Start Game</button>
`;

// 2. Add the redirection logic
const startButton = document.getElementById("start-button");

if (startButton) {
    startButton.addEventListener("click", () => {
        // This tells the browser to navigate to your game page
        window.location.href = "game.html";
    });
}