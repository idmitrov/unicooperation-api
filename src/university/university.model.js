import { dbSchema, dbModel } from '../db';

const universitySchema = new dbSchema({
    /**
     * @name name
     * @type String
     */
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default dbModel('University', universitySchema);