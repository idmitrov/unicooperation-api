import { dbSchema, dbModel } from '../db';

const accountSchema = new dbSchema({
    /**
     * @name email
     * @type String
     */
    email: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * @name password
     * @type String
     */
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

export default new dbModel('Account', accountSchema);