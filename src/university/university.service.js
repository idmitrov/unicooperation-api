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
     * @param {Number} skip
     * @param {Number} limit
     */
    filterByName(name, skip = 0, limit = 10, projection = []) {
        const regex = new RegExp(`^${name}`, 'i');

        return University.find({ name: { $regex: regex } })
            .select(projection)
            .skip(skip || 0)
            .limit(limit || 10);
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
     */
    create(name, countryCode, accountId) {
        const newUniversity = new University({ name, countryCode, accountId });

        return newUniversity.save();
    }
}