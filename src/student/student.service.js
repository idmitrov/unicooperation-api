import Student from './student.model';

export default {
    create(studentData) {        
        const newStudent = new Student(studentData);

        return newStudent.save();
    }
}