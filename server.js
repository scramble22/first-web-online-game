const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Пользователь подключен');

    socket.on('startGame', (data) => {
        socket.username = data.username;
        io.emit('gameStatus', { message: `${data.username} присоединился к игре.` });
        io.emit('showGame');
    });

    socket.on('makeMove', (data) => {
        const moves = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        const computerMove = moves[randomIndex];

        const userMove = data.move;
        let result;

        if (userMove === computerMove) {
            result = 'Ничья!';
        } else if (
            (userMove === 'rock' && computerMove === 'scissors') ||
            (userMove === 'paper' && computerMove === 'rock') ||
            (userMove === 'scissors' && computerMove === 'paper')
        ) {
            result = `${socket.username} выиграл(а)`;
        } else {
            result = 'Компьютер выиграл';
        }

        io.emit('gameStatus', { message: result });
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключен');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
