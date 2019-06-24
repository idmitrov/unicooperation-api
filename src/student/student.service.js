import Student from './student.model';

export default {
    /**
     * Matching Students by given criteria like experience, title etc..
     * @name match
     * @param {Object} criteria 
     * @param {Number} page
     * @param {Number} limit
     * @param {Array} projection
     */
    match(criteria, page = 1, limit = 10, projection = []) {
        const query = { available: true };
        const optionalCriterias = ['experience', 'verified', 'universityId'];
        
        page = Number(page) || 0;
        limit = Number(limit) || 10;

        if (criteria.title) {
            const regex = new RegExp(`${criteria.title}`, 'i');
            
            query.title = { $regex: regex };
        }

        optionalCriterias.forEach((key) => {
            const isCriteriaPropertyDefined = criteria.hasOwnProperty(key);

            if (isCriteriaPropertyDefined) {
                const criteriaValue = criteria[key];

                if (Array.isArray(criteriaValue)) {
                    query[key] = { $in: criteriaValue };
                } else {
                    query[key] = criteriaValue;
                }
            }
        });
        
        return Promise.all([
            Student.find(query)
                .populate('account', 'type -_id')
                .select(projection)
                .skip(page > 1 ? (page - 1) * limit : 0)
                .limit(limit),
            Student.find(query).countDocuments()
        ]);
    },
    getPreview(studentId) {
        return this
            .findById(studentId)
            .populate('account', 'type -_id')
    },
    /**
     * Find a student by id
     * @name findById
     * @param {String} id 
     * @param {Array} projection 
     */
    findById(id, projection = []) {
        return Student
            .findById(id)
            .select(projection);
    },
    /**
     * Create a new student
     * @name create
     * @param {String} firstName 
     * @param {String} facultyId 
     * @param {String} universityId 
     * @param {String} account 
     */
    create(firstName, facultyId, universityId, account) {        
        const newStudent = new Student({ firstName, facultyId, universityId, account });

        return newStudent.save();
    },
    /**
     * Find a given Student by id and update it data by provided update
     * @name findByIdAndUpdate
     * @param {String} id 
     * @param {String} update 
     */
    findByIdAndUpdate(id, update) {
        return Student.findOneAndUpdate({'_id': id}, update, { new: true });
    }
}