import Add from './add.model';

export default {
    getAdds(page = 1, limit = 10, active = true, projection = []) {
        return Promise.all([
            Add
                .find({ isActive: active })
                .select(projection)
                .skip(page * limit)
                .limit(limit),
            Add
                .find({ isActive: active })
                .countDocuments()
        ]);
    }   
}