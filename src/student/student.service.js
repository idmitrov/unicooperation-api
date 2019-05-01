import Student from './student.model';

export default {
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
     * @param {String} accountId 
     */
    create(firstName, facultyId, universityId, accountId) {        
        const newStudent = new Student({ firstName, facultyId, universityId, accountId });

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