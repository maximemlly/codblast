import"./common-pjiY56_e.js";const e=localStorage.getItem("codblast_highscore")||0,o=document.querySelector("#app");o.innerHTML=`
  <div id="title">
    <p>Welcome to</p>
    <h1>COD'BLAST</h1>
  </div>
  <p id="subtitle">Current Highscore: <span>${e}</span></p>
  <button id="start-button">Start Game</button>
`;const t=document.getElementById("start-button");t&&t.addEventListener("click",()=>{window.location.href="game.html"});
