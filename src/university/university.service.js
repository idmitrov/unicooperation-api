import University from './university.model';

export default {
    /**
     * Find a given university by provided id
     * @name findById
     * @param {String} id
     * @param {Array} projection
     */
    findById(id, projection = []) {
        return University
            .findById(id)
            .select(projection);
    },
    /**
     * Find a given University by id and update it data by provided update
     *  @name findByIdAndUpdate
     */
    findByIdAndUpdate(id, update) {
        return University.findOneAndUpdate(id, update, { new: true });
    },
    /**
     * Filter universities by name which starts with a given query
     * @name filter
     * @param {String} name
     * @param {Number} page
     * @param {Number} limit
     */
    filterByName(name, page = 0, limit = 10, projection = []) {
        const regex = new RegExp(`^${name}`, 'i');

        page = Number(page) || 0;
        limit = Number(limit) || 10;
        

        return Promise.all([
            University.find({ name: { $regex: regex } })
                .populate('account')
                .select(projection)
                .skip(page > 1 ? (page - 1) * limit : 0)
                .limit(limit),
            University.find({ name: { $regex: regex } }).countDocuments()
        ])
    },
    /**
     * Find a given university by name
     * @name findByName
     * @param {String} name 
     */
    findByName(name, projection = []) {
        return University.findOne({ name })
            .select(projection);
    },
    /**
     * Create new university
     * @name create
     * @param {Object} universityData
     * @param {String} account
     */
    create(name, countryCode, account) {
        const newUniversity = new University({ name, countryCode, account });

        return newUniversity.save();
    }
}