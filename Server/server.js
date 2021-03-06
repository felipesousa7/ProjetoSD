import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const game = {
    players: {},
    rooms: {},
    match: {},
};

sockets.on('connection', (socket) => {
    console.log(`${socket.id} conectado.`);

    const name = 'Player_' + socket.id.substr(0, 5);
    game.players[socket.id] = { name };
    sendMessage(game.players[socket.id], 'entrou');
    refreshPlayers();
    refreshRooms();

    socket.on('disconnect', () => {
        console.log(`${socket.id} desconectou.`)
        sendMessage(game.players[socket.id], 'saiu');
        leaveRoom(socket);

        delete game.players[socket.id];

        refreshPlayers();
        refreshRooms();
    });

    socket.on('SendMessage', (message) => {
        sendMessage(game.players[socket.id], message);
    });

    socket.on('CreateRoom', () => {
        socket.join(socket.id);

        game.rooms[socket.id] = {
            name: `Sala do ${game.players[socket.id].name}`,
            player1: socket.id,
            player2: undefined
        };

        game.players[socket.id].room = socket.id;

        refreshPlayers();
        refreshRooms();
        sendMessage(game.players[socket.id], 'criou uma sala');
    });

    socket.on('LeaveRoom', () => {
        leaveRoom(socket);

        refreshPlayers();
        refreshRooms();
    });

    socket.on('JoinRoom', (roomId) => {
        socket.join(roomId);

        const position = game.rooms[roomId].player1 ? '2' : '1';

        game.rooms[roomId][`player${position}`] = socket.id;

        game.players[socket.id].room = roomId;

        const room = game.rooms[roomId];

        if(room.player1 && room.player2) {
            game.match[roomId] = {
                score1: 0,
                score2: 0,
                errors: 0,
                status: 'START', 
            }
        }

        refreshPlayers();
        refreshRooms();
        refreshMatch(roomId);
        sendMessage(game.players[socket.id], 'entrou numa sala');
    });
});

const leaveRoom = (socket) => {
    const socketId = socket.id;
    const roomId = game.players[socketId].room;
    const room = game.rooms[roomId];

    if (room) {
        socket.leave(roomId);

        game.players[socketId].room = undefined;

        if (socketId === room.player1) {
            room.player1 = undefined;
        } else {
            room.player2 = undefined;
        }

        if (!room.player1 && !room.player2) {
            delete game.rooms[socketId];
        }
    }
};

const sendMessage = (player, message) => {
    sockets.emit('ReceiveMessage', `${player.name}: ${message}`);
};

const refreshPlayers = () => {
    sockets.emit('PlayersRefresh', game.players);
};

const refreshRooms = () => {
    sockets.emit('RoomsRefresh', game.rooms);
};

const refreshMatch = (roomId) => {
    sockets.to(roomId).emit('MatchRefresh', game.match[roomId])
}

app.get('/', (req, res) => res.send('Hello World!'));

const port = 4000;
server.listen(port, () => console.log(`Server rodando na porta ${port}!`));
