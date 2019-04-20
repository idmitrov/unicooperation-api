import Publication from './publication.model';

let rooms = {};

export default {
    /**
     * Get publications by given sort criteria and skip/limit
     * @name getList
     * @param {Number} skip 
     * @param {Number} limit 
     */
    getList(publisherId, sort = 'createdAt', skip = 0, limit = 10) {
        console.log(publisherId);
        
        return Publication
            .find({ publisher: publisherId})
            .sort(`-${sort}`)
            .limit(limit);
    },
    /**
     * Create new publication
     * @name create
     * @param {String} publisherType 
     * @param {Object} publisher 
     * @param {String} content 
     */
    create(publisherType, publisher, content) {
        const publication = new Publication({
            publisherType,
            publisher,
            content
        });

        return publication.save();
    },
    /**
     * Join to room by given roomId
     * @name join
     * @param {String} roomId 
     * @param {Object} client 
     */
    join(roomId, client) {
        // TODO: Verify if needs check if client is already joined into that room
        client.join(roomId);
        rooms[roomId] ? rooms[roomId].push(client) : rooms[roomId] = [client];
    }
};