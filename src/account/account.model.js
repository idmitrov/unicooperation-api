import { dbSchema, dbModel } from '../db';

const accountSchema = new dbSchema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

export default new dbModel('Account', accountSchema);