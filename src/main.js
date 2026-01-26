import "./style.css";
import { Grid } from "./models/Grid.js";
import { BoardView } from "./views/boardView.js";

const canvas = document.getElementById("board-canvas");

const grid = new Grid();
const board = new BoardView(canvas, grid, { tileSize: 56 });

window.addEventListener("resize", () => board.resize());
