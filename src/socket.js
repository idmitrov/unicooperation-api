const rooms = {};

/**
 * Add a socket to room
 * @name addClientToRoom
 * @param {String} roomId 
 * @param {WebSocket} client 
 */
export const addClientToRoom = (roomId, client) => {
    rooms[roomId] ? rooms[roomId].push(client) : rooms[roomId] = [client];
}

/**
 * Remove a socket from room
 * @name addClientToRoom
 * @param {String} roomId 
 * @param {WebSocket} client
 */
export const removeClientFromRoom = (roomId, clientId) => {
    const room = rooms[roomId];
    const clientToRemoveIndex = room.findIndex((c) => client.id === clientId);

    room.splice(clientToRemoveIndex, 1);
}