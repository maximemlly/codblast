document.addEventListener('DOMContentLoaded', () => {
    // prend la data depuis le navigateur our le met a 0 par defaut si le joueur a jamais jouer
    const highScore = localStorage.getItem('codblast_highscore') || 0;
    const gamesPlayed = localStorage.getItem('codblast_games_played') || 0;

    // DOM API: Inject les valeurs into the HTML
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('games-played').textContent = gamesPlayed;
});