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
        ref: 'Account',
        required: true
    },
    /**
     * @name avatar
     * @type String
     */
    avatar: {
        type: String,
        default: null
    },
    /**
     * @name facebookUrl
     * @type String
     */
    facebookUrl: {
        type: String,
        default: null
    },
    /**
     * @name instagramUrl
     * @type String
     */
    instagramUrl: {
        type: String,
        default: null
    },
    /**
     * @name linkedinUrl
     * @type String
     */
    linkedinUrl: {
        type: String,
        default: null
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
     * @name rating
     * @type Number
     */
    rating: {
        type: Number,
        default: 0
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
     * @name students
     * @type Array
     */
    universities: [
        { type: dbSchema.Types.ObjectId, ref: 'University' }
    ]
}, partnerSchemaOptions);

export default dbModel('Partner', partnerSchema);