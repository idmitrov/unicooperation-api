import { dbSchema, dbModel } from '../db';

const studentSchemaOptions = {
    timestamps: true
};

const studentSchema = new dbSchema({
    /**
     * @name accountId
     * @type Account
     */
    accountId: {
        type: dbSchema.Types.ObjectId,
        ref: 'Account'
    },
    /**
     * @name facultyId
     * @type String
     */
    facultyId: {
        type: String,
        required: true
    },
    /**
     * @name firstName
     * @type String
     */
    firstName: {
        type: String,
        required: true
    },
    /**
     * @name lastName
     * @type String
     */
    lastName: {
        type: String
    },
    /**
     * @name middleName
     * @type String
     */
    middleName: {
        type: String
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
     * @name verified
     * @type Boolean
     */
    verified: {
        type: Boolean,
        default: false
    },
    /**
     * @name summary
     * @type String
     */
    summary: {
        type: String,
        default: null
    },
    /**
     * @name uinversityId
     * @type String
     */
    uinversityId: {
        type: dbSchema.Types.ObjectId,
        ref: 'University',
        required: true
    }
}, studentSchemaOptions);

studentSchema.index({ uinversityId: 1, facultyId: 1 }, { unique: true })

export default dbModel('Student', studentSchema);