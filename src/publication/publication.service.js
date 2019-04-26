import Publication from './publication.model';
import { broadcastToRoom } from '../socket';

const defaultPublicationsLimit = 10;
const defaultPublicationsSkip = 0;

export default {
    /**
     * Get publications by given sort criteria and skip/limit
     * @name getList
     * @param {Number} skip default = 0
     * @param {Number} limit default = 10
     */
    getList(feedId, sort = 'createdAt', skip = defaultPublicationsSkip, limit = defaultPublicationsLimit, projection = []) {
        const limitNumeric = parseInt(limit);
        const skipNumeric = parseInt(skip);

        return Promise.all([
            Publication
                .find({ feed: feedId })
                .populate(projection)
                .sort(`-${sort}`)
                .skip(skipNumeric || defaultPublicationsSkip)
                .limit(limitNumeric || defaultPublicationsLimit),
            Publication.countDocuments()
        ])
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

        return publication.save();
    }
};