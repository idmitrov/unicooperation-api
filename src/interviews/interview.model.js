import { dbSchema, dbModel } from '../db';

const interviewSchemaOptions = {
    timestamps: true
};

const interviewSchema = new dbSchema({
    /**
     * @name ad,
     * @type String
     */
    ad: {
        type: dbSchema.Types,
        ref: 'Ad',
        required: true
    },
    /**
     * @name interviewer
     * @type String
     */
    interviewer: {
        type: dbSchema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },
    /**
     * @Name address
     * @type String
     */
    address: {
        type: String,
        default: null
    },
    /**
     * @name interviewerNotes
     * @type String
     */
    interviewerNotes: {
        type: String,
        default: null
    },
    /**
     * @name interviewed
     * @type String
     */
    applicant: {
        type: dbSchema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    /**
     * @name applicantNotes
     * @type String
     */
    applicantNotes: {
        type: String,
        default: null
    },
    /**
     * @name scheduledDate
     * @type DateTime
     */
    scheduledDate: {
        type: dbSchema.Types.Date,
        default: null,
        required: true
    },
    /**
     * @name accepted
     * @type Boolean
     */
    accepted: {
        type: Boolean,
        default: false
    },
    /**
     * @name acceptDate,
     * @type DateTime
     */
    acceptDate: {
        type: dbSchema.Types.Date,
        default: null
    },
    /**
     * @name succeeded
     * @type Boolean
     */
    succeeded: {
        type: Boolean,
        default: false
    },
    /**
     * @name isActive
     * @type Boolean
     */
    isActive: {
        type: Boolean,
        default: true
    },
    /**
     * @name title
     * @type String
     */
    title: {
        type: String,
        required: true
    }
}, interviewSchemaOptions);

export default dbModel('Interview', interviewSchema);