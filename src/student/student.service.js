import Student from './student.model';

export default {
    /**
     * Matching Students by given criteria like experience, title etc..
     * @name match
     * @param {Object} criteria 
     */
    match(criteria) {
        const allowedSimpleCriterias = [
            'title',
            'experience',
            'verified'
        ];
        
        const query = {};

        if (criteria.universities) {
            query.universityId = { $in: criteria.universities };
        }

        allowedSimpleCriterias.forEach((key) => {
            if (criteria.hasOwnProperty(key)) {
                query[key] = criteria[key];
            }
        });

        return Student.find(query);
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
        return Student.findOneAndUpdate(id, update, { new: true });
    }
}