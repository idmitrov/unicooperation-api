import Ad from './ads.model';

const defaultAdsSkip = 0;
const defaultAdsLimit = 10;
const defaultAdsSort = 'createdAt';

export default {
    /**
     * Get a given ad by id
     * @name getById
     * @param {String} id 
     * @param {Array} projection 
     */
    getById(id, projection = []) {
        return Ad
            .findById(id)
            .lean()
            .select(projection);
    },
    /**
     * Get all ads, array of ads
     * @name getAll
     * @param {Object} conditions
     * @param {Number} skip 
     * @param {Number} limit 
     * @param {String} sort 
     * @param {Array} projection 
     */
    getAll(conditions = { isActive: true }, skip = defaultAdsSkip, limit = defaultAdsLimit, sort = defaultAdsSort, projection = []) {
        const skipNumeric = parseInt(skip);
        const limitNumeric = parseInt(limit);
        
        return Promise.all([
            Ad
                .find(conditions)
                .lean()
                .select(projection)
                .sort(`-${sort}`)
                .skip(skipNumeric || defaultAdsSkip)
                .limit(limitNumeric || defaultAdsLimit),
            Ad
                .find(conditions)
                .countDocuments()
        ]);
    },
    /**
     * Get ad candidates
     * @name getCandidates
     * @param {String} adId 
     * @param {Array} projection 
     */
    getCandidates(adId, skip = defaultAdsSkip, limit = defaultAdsLimit, sort=defaultAdsSort, projection = []) {
        skip = skip || defaultAdsSkip;
        limit = limit || defaultAdsLimit;
        sort = sort || defaultAdsSort;

        return Ad.findById(adId)
            .populate({
                path: 'candidates',
                model: 'Student',
                select: projection
            })
            .sort(`-${sort}`)
            .skip(skip)
            .limit(limit)
               .then((ad) => ad.candidates);
    },
    /**
     * Create new add
     * @name create
     * @param {String} title 
     * @param {String} content 
     * @param {Object} author 
     */
    create(title, content, author) {
        let errors = [];


        if (!title) {
            errors.push({ message: 'Title is missing.' });
        }

        if (!content) {
            errors.push({ message: 'Content is missing.' });
        }

        if (errors.length) {
            throw { errors };
        }
        
        const newAd = new Ad({ title, content, author });

        return newAd.save();
    },
    /**
     * Edit existing Ad
     * @name edit
     * @param {String} adId 
     * @param {String} title 
     * @param {String} content 
     */
    edit(adId, update) {
        if (!adId) {
            throw Error('adId is missing');
        }

        return Ad.findOneAndUpdate({ '_id': adId }, update, { new: true })
            .lean()
            .then((ad) => {
                if (!ad) {
                    throw Error('Cannot modify unknown entity.')
                }
                
                return ad;
            });
    }
}