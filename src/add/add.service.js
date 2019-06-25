import Add from './add.model';

const defaultAddsSkip = 0;
const defaultAddsLimit = 10;
const defaultAddsSort = 'createdAt';

export default {
    /**
     * Get all adds, array of adds
     * @name getAll
     * @param {Number} skip 
     * @param {Number} limit 
     * @param {String} sort 
     * @param {Boolean} active 
     * @param {Array} projection 
     */
    getAll(skip = defaultAddsSkip, limit = defaultAddsLimit, sort = defaultAddsSort, active = true, projection = []) {
        const skipNumeric = parseInt(skip);
        const limitNumeric = parseInt(limit);
        
        return Promise.all([
            Add
                .find({ isActive: active })
                .select(projection)
                .sort(`-${sort}`)
                .skip(skipNumeric || defaultAddsSkip)
                .limit(limitNumeric || defaultAddsLimit),
            Add
                .find({ isActive: active })
                .countDocuments()
        ]);
    },
    /**
     * Create new add
     * @name create
     * @param {String} title 
     * @param {String} content 
     * @param {Object} author 
     */
    create(title, content, author) {
        const add = new Add({ title, content, author });

        return add.save();
    },
    /**
     * Edit existing Add
     * @name edit
     * @param {String} addId 
     * @param {String} title 
     * @param {String} content 
     */
    edit(addId, title, content) {
        if (!addId) {
            throw Error('Id is missing');
        }
        
        if (!title) {
            throw Error('Title is missing');
        }

        if (!content) {
            throw Error('Content is missing');
        }

        return Add.findOneAndUpdate({ '_id': addId }, { title, content }, { new: true })
            .then((add) => {
                if (!add) {
                    throw Error('Cannot modify unknown entity.')
                }
                
                return add;
            });
    }
}