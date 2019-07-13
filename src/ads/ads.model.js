import { dbSchema, dbModel } from '../db';
import { accountType } from '../account/account.constants';

const adSchemaOptions = {
    timestamps: true
};

const adSchema = new dbSchema({
    /**
     * @name title
     * @type String
     */
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    /**
     * @name content
     * @type String
     */
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    /**
     * @name author
     * @type Objject
     */
    author: {
        type: dbSchema.Types.ObjectId,
        ref: accountType.partner
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
     * @name candidates
     * @type Array
     */
    candidates: {
        type: [accountType.student],
        default: []
    }
}, adSchemaOptions);

export default dbModel('Ad', adSchema);
