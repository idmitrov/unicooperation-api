import { dbSchema, dbModel } from '../db';

const adminSchemaOptions = {
    timestamps: true
};

const adminSchema = new dbSchema({
    /**
     * @name accountId
     * @type String
     */
    accountId: {
        type: dbSchema.Types.ObjectId,
        ref: 'Account'
    },
    /**
     * @name mobileNumber
     * @type String
     */
    mobileNumber: {
        type: String,
        default: null
    },
    /**
     * @name name
     * @type String
     */
    name: {
        type: String,
        required: true
    }
}, adminSchemaOptions);

export default dbModel('Admin', adminSchema);