import "./style.css";

// 1. Get the highscore from the browser's memory
const highscore = localStorage.getItem('codblast_highscore') || 0;

const app = document.querySelector("#app");

// 2. Render the landing page UI
app.innerHTML = `
  <div id="title">
    <p>Welcome to</p>
    <h1>COD'BLAST</h1>
  </div>
  <p id="subtitle">Current Highscore: <span>${highscore}</span></p>
  <button id="start-button">Start Game</button>
`;

// 3. Add the redirection logic
const startButton = document.getElementById("start-button");

if (startButton) {
    startButton.addEventListener("click", () => {
        // Navigates from index.html to the grid page
        window.location.href = "game.html";
    });
}