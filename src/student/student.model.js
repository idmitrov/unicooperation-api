import { dbSchema, dbModel } from '../db';

const studentSchema = new dbSchema({
    firstName: {
        type: String
    }
});

export default dbModel('Student', studentSchema);