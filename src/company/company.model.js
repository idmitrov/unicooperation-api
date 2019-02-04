import { dbSchema, dbModel } from '../db';

const companySchema = new dbSchema({
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

export default dbModel('Company', companySchema);