import { dbSchema, dbModel } from '../db';

const studentSchema = new dbSchema({
    /**
     * @name facultyId
     * @type String
     */
    facultyId: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * @name firstName
     * @type String
     */
    firstName: {
        type: String
    },
    /**
     * @name lastName
     * @type String
     */
    lastName: {
        type: String
    }
});

export default dbModel('Student', studentSchema);