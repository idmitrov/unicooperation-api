import Student from './student.model';

export default {
    create(firstName, facultyId, universityId, accountId) {        
        const newStudent = new Student({ firstName, facultyId, universityId, accountId });

        return newStudent.save();
    }
}