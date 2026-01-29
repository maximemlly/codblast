import "./style.css";

document.querySelector("#credits").innerHTML = `
<p id="credits">Made with ❤️ by <a href="https://github.com/devilishlyney/">Emery</a>, <a href="https://github.com/maximemlly/">Maxime</a> and <a href="https://github.com/thegesse/">Esteban</a></p>
`

const navContent = `
<li><a href="index.html" id="home-button">Home</a></li>
<li><a href="" id="player-stats-button">Your Stats</a></li>
<li><a href="about.html" id="about-button">About</a></li>
`;

const desktopNav = document.querySelector("#navbar");
if (desktopNav) {
    desktopNav.innerHTML = navContent;
}

const mobileNav = document.querySelector(".nav-mobile");
if (mobileNav) {
    mobileNav.innerHTML = navContent;
}