import University from './university.model';

export default {
    /**
     * Filter universities by name which starts with a given query
     * @name filter
     * @param {String} name
     * @param {Number} skip
     * @param {Number} limit
     */
    filterByName(name, skip = 0, limit = 10) {
        const regex = new RegExp(`^${name}`, 'i');

        return University.find({ name: { $regex: regex } })
            .select(['name', 'rating'])
            .skip(skip)
            .limit(limit);
    },
    /**
     * Find a given university by name
     * @name findByName
     * @param {String} name 
     */
    findByName(name) {
        return University.findOne({ name })
            .select(['name', 'rating', 'mobileNumber']);
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