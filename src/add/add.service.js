import Add from './add.model';

const defaultAddsSkip = 0;
const defaultAddsLimit = 10;
const defaultAddsSort = 'createdAt';

export default {
    getAdds(skip = defaultAddsSkip, limit = defaultAddsLimit, sort = defaultAddsSort, active = true, projection = []) {
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
    createNewAdd(title, content, author) {
        const add = new Add({ title, content, author });

        return add.save();
    }
}