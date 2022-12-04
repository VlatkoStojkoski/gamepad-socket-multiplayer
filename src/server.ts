import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
app.use(express.static('public'));

const server = createServer(app);
const io = new SocketServer(server);

io.on('connection', (socket) => {
	console.log('user lobbying', socket.id);

	socket.on('change', (squareState) => {
		console.log('change', socket.id);

		const joinedSquares = io.sockets.adapter.rooms.get('game room');
		const isSquareJoined = joinedSquares?.has(socket.id);

		if (!isSquareJoined) return;

		socket.broadcast.to('game room')
			.emit('change', { ...squareState, id: socket.id });
	});

	socket.on('join-game', (squareState) => {
		console.log('join-game', socket.id);

		socket.join('game room');
		socket.broadcast.to('game room')
			.emit('user-joined', { ...squareState, id: socket.id });
	});

	socket.on('disconnect', () => {
		console.log('user disconnected', socket.id);

		socket.broadcast.emit('user-left', socket.id);
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
