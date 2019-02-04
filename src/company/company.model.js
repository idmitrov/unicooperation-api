import { dbSchema, dbModel } from '../db';

const companySchema = new dbSchema({
    name: {
        type: String
    }
});

export default dbModel('Company', companySchema);