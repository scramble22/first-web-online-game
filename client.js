const socket = io();

function startGame() {
    const username = document.getElementById('username').value;
    socket.emit('startGame', { username });
}

function makeMove(move) {
    socket.emit('makeMove', { move });
}

socket.on('gameStatus', (data) => {
    document.getElementById('status').innerText = data.message;
});

socket.on('showGame', () => {
    document.getElementById('game').style.display = 'block';
});
