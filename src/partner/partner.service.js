import Partner from './partner.model';

export default {
    /**
     * Find a given Partner by id
     * @name findById
     * @param {String} id 
     */
    findById(id, projection = []) {
        return Partner
            .findById(id)
            .select(projection);
    },
    /**
     * Find a given Partner by id and update it data by provided update
     * @name findByIdAndUpdate
     * @param {String} id 
     * @param {String} update 
     */
    findByIdAndUpdate(id, update) {
        return Partner.findOneAndUpdate(id, update, { new: true });
    },
    /**
     * Filter partners by name which starts with a given query
     * @name filter
     * @param {String} name
     * @param {Number} skip
     * @param {Number} limit
     */
    filterByName(name, skip = 0, limit = 10, projection = []) {
        const regex = new RegExp(`^${name}`, 'i');
        
        skip = Number(skip) || 0;
        limit = Number(limit) || 10;

        return Promise.all([
            Partner.find({ name: { $regex: regex } })
                .select(projection)
                .skip(skip || 0)
                .limit(limit || 10),
            Partner.find({ name: { $regex: regex } }).countDocuments()
        ])
    },
    /**
     * Create a new Partner
     * @name create
     * @param {String} name 
     * @param {String} countryCode 
     * @param {String} accountId 
     */
    create(name, countryCode, accountId) {        
        const newPartner = new Partner({name, countryCode, accountId});

        return newPartner.save();
    }
}