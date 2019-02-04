import { dbSchema, dbModel } from '../db';

const universitySchema = new dbSchema({
    name: {
        type: String
    }
});

export default dbModel('University', universitySchema);