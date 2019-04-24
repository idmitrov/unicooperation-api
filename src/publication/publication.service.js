import Publication from './publication.model';
import { broadcastToRoom } from '../socket';

export default {
    /**
     * Get publications by given sort criteria and skip/limit
     * @name getList
     * @param {Number} skip 
     * @param {Number} limit 
     */
    getList(feedId, sort = 'createdAt', skip = 0, limit = 10, projection = []) {
        return Publication
            .find({ feed: feedId})
            .populate(projection)
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
    create(publisherType, publisher, feed, content) {
        const publication = new Publication({
            publisherType,
            publisher,
            feed,
            content
        });

        return publication.save()
            .then(() => {
                // TODO: Think about, getting list with start of createdPost and limit 10 i.e
                // the newly created post should be the 1st one (latest)
                return this.getList(feed, 'createdAt', 0, 10, ['publisher']);
            });
    }
};