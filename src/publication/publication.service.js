import Publication from './publication.model';

export default {
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
    }
};