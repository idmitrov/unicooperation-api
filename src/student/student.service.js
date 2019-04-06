import Student from './student.model';

export default {
    findById(id, projection = []) {
        return Student
            .findById(id)
            .select(projection);
    },
    create(firstName, facultyId, universityId, accountId) {        
        const newStudent = new Student({ firstName, facultyId, universityId, accountId });

        return newStudent.save();
    }
}