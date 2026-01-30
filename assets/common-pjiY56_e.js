(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();document.querySelector("#credits").innerHTML=`
<p id="credits">Made with ❤️ by <a href="https://github.com/devilishlyney/">Emery</a>, <a href="https://github.com/maximemlly/">Maxime</a> and <a href="https://github.com/thegesse/">Esteban</a></p>
`;const c=`
<li><a href="index.html" id="home-button">Home</a></li>
<li><a href="stats.html" id="player-stats-button">Your Stats</a></li>
<li><a href="about.html" id="about-button">About</a></li>
`,n=document.querySelector("#navbar");n&&(n.innerHTML=c);const s=document.querySelector(".nav-mobile");s&&(s.innerHTML=c);
