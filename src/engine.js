
let keys = {};

const initialState = ({
    areaWidth
}) => ({
    player: {
        x: 150,
        y: 100,
        width: 0,
        height: 0,
        lastTimeFiredFireball: 0
    },
    scene: {
        isActiveGame: true,
        score: 0,
        lastCloudSpawn: 0,
        lastBugSpawn: 0,
        areaWidth,
        attackWidth: 40,
        attackHeight: 40
    },
    clouds: [],
    attacks: [],
    bugs: []
});

const nextPlayer = s => s.player;
const nextScene = s => s.scene;
const nextClouds = s => s.clouds;
const nextAttacks = s => s.attacks
    .filter(a => {
        if (a.x + s.scene.attackWidth > s.scene.areaWidth)
        {
            a.el.parentElement.removeChild(a.el);
            return false;
        } 

        return true;
    })
    .map(a => ({...a, x: a.x + game.speed * game.fireBallMultiplier}));
const nextBugs = s => s.bugs;

const next = (state) => ({
    player: nextPlayer(state),
    scene: nextScene(state),
    clouds: nextClouds(state),
    attacks: nextAttacks(state),
    bugs: nextBugs(state)
});

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom || 
            firstRect.bottom < secondRect.top ||
            firstRect.right < secondRect.left ||
            firstRect.left > secondRect.right);
}

function gameOverAction() {
    state.scene.isActiveGame = false;
    gameOver.classList.remove('hide');
}

function addFireBall(state) {
    let fireBall = document.createElement('div');
    
    fireBall.classList.add('fire-ball');
    fireBall.style.top = (state.player.y + state.player.height / 3 - 5) + 'px';
    fireBall.x = state.player.x + state.player.width;
    fireBall.style.left = fireBall.x + 'px';

    state.attacks.push({
        x: state.player.x,
        y: state.player.y + state.player.height / 3 - 5,
        el: fireBall
    });

    gameArea.appendChild(fireBall);
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}