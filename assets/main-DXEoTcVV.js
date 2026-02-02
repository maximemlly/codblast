import"./common-pjiY56_e.js";const d=localStorage.getItem("codblast_highscore")||0,u=document.querySelector("#app");u.innerHTML=`
  <div id="title">
    <p>Welcome to</p>
    <h1>COD'BLAST</h1>
  </div>
  <p id="subtitle">Current Highscore: <span>${d}</span></p>
  <button id="start-button">Start Game</button>
`;const i=document.getElementById("start-button");i&&i.addEventListener("click",()=>{window.location.href="game.html"});const t=document.querySelector(".menu-toggle-mobile"),e=document.querySelector(".nav-mobile"),o=document.querySelector(".menu-overlay");function m(){e&&t&&o&&(e.classList.toggle("active"),t.classList.toggle("active"),o.classList.toggle("active"),e.classList.contains("active")?document.body.style.overflow="hidden":document.body.style.overflow="")}function r(){e&&t&&o&&(e.classList.remove("active"),t.classList.remove("active"),o.classList.remove("active"),document.body.style.overflow="")}t&&t.addEventListener("click",m);o&&o.addEventListener("click",r);e&&e.addEventListener("click",c=>{c.target.tagName==="A"&&r()},!1);let s=window.scrollY;const n=document.querySelector(".header");window.addEventListener("scroll",()=>{window.scrollY>s&&window.scrollY>100?n.classList.add("hide"):n.classList.remove("hide"),s=window.scrollY});document.querySelectorAll('a[href^="#"]').forEach(c=>{c.addEventListener("click",function(a){a.preventDefault();const l=document.querySelector(this.getAttribute("href"));l&&l.scrollIntoView({behavior:"smooth",block:"start"})})});
