const rooms = {};

/**
 * Leave a given room
 * @name leaveRoom
 * @param {String|Number} roomId 
 * @param {WebSocket} socket 
 */
export const leaveRoom = (roomId, socket) => {
    socket.leave(roomId);

    const room = rooms[roomId];
    const clientToRemoveIndex = room.findIndex((c) => client.id === socket.id);

    room.splice(clientToRemoveIndex, 1);
}

/**
 * Join to a given room
 * @name joinRoom
 * @param {String|Number} roomId 
 * @param {WebSocket} socket 
 */
export const joinRoom = (roomId, socket) => {
    socket.join(roomId);

    rooms[roomId] ? rooms[roomId].push(socket) : rooms[roomId] = [socket];
}


/**
 * Subscribe for socket event
 * @name subscribeForEvent
 * @param {String} event 
 * @param {WebSocket} socket 
 * @param {Function} handler 
 */
export const subscribeForEvent = (event, socket, handler) => {
    socket.on(event, handler);
}