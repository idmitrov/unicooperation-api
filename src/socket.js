const rooms = {};

let socketEngine = null;

/**
 * Set the socket engine
 * @name init
 * @param {Object} engine 
 */
export const init = (engine) => {
    if (socketEngine === null) {
        socketEngine = engine;

        // socketEngine.in('5cb78e153d102d4eb064f618').emit('update');
    } else {
        throw new Error('Socket engine is already initialized and cannot be modified');
    }
}

/**
 * Handle events for a given namespace
 * @name handleNamespaceEvents
 * @param {String} namespace 
 * @param {Function} eventsHandler 
 * @param {Array} middlewares 
 */
export const handleNamespaceEvents = (namespace, eventsHandler, middlewares) => {
    const nsSocket = socketEngine.of(namespace, eventsHandler);

    middlewares.forEach((middleware) => {
        nsSocket.use(middleware);
    });
}

/**
 * Leave a given room
 * @name leaveRoom
 * @param {String|Number} roomId 
 * @param {WebSocket} socket 
 */
export const leaveRoom = (roomId, clientId, socket) => {
    const room = rooms[roomId];
    const clientSocket = room[clientId];

    clientSocket.leave(roomId);
    delete rooms[roomId];
}

/**
 * Join to a given room
 * @name joinRoom
 * @param {String|Number} roomId 
 * @param {WebSocket} socket 
 */
export const joinRoom = (roomId, socket) => {
    const { account } = socket;
    
    socket.join(roomId);

    if (!rooms[roomId]) {
        rooms[roomId] = {};
    }

    rooms[roomId][account.id] = socket;
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

/**
 * Broadcast a message to a given room
 * @name broadcastToRoom
 * @param {String|Number} roomId 
 * @param {String} eventType 
 * @param {Any} data 
 */
export const broadcastToRoom = (roomId, clientId, eventType, data = null) => {
    const room = rooms[roomId];
    const clientSocket = room[clientId];

    if (data) {
        clientSocket.to(roomId).emit(eventType, data);
    } else {
        clientSocket.to(roomId).emit(eventType);
    }
}