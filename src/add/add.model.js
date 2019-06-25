import { dbSchema, dbModel } from '../db';
import { accountType } from '../account/account.constants';

const addSchemaOptions = {
    timestamps: true
};

const addSchema = new dbSchema({
    /**
     * @name title
     * @type String
     */
    title: {
        type: String,
        requried: true
    },
    /**
     * @name content
     * @type String
     */
    content: {
        type: String,
        requried: true
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
}, addSchemaOptions);

export default dbModel('Add', addSchema);
