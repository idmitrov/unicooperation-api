import { dbSchema, dbModel } from '../db';

const partnerSchemaOptions = {
    timestamps: true
};

const partnerSchema = new dbSchema({
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
    },
    /**
     * @name students
     * @type Array
     */
    universities: [
        { type: dbSchema.Types.ObjectId, ref: 'University' }
    ]
}, partnerSchemaOptions);

export default dbModel('Partner', partnerSchema);