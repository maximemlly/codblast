import "./style.css";
import { Grid } from "./models/Grid.js";
import { BoardView } from "./views/boardView.js";

document.querySelector("#app").innerHTML = `
  <div id="title">
    <p>Welcome to</p>
    <h1>COD'BLAST</h1>
  </div>
  <p id="subtitle">Current highscore: mettre valeur dynamique</p>
  <button id="start-button">Start Game</button>
  `
