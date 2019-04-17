import { dbSchema, dbModel } from '../db';
import { accountType } from '../account/account.constants';

const publicationSchemaOptions = {
    timestamps: true
};

const publicationSchema = new dbSchema({
    /**
     * @name publisherType
     * @type {String}
     */
    publisherType: {
        type: String,
        enum: Object.values(accountType),
        required: true
    },
    /**
     * @name publisher
     * @type {Object}
     */
    publisher: {
        type: dbSchema.Types.ObjectId,
        refPath: 'publisherType',
        required: true
    },
    /**
     * @name content
     * @type {String}
     */
    content: {
        type: String,
        required: true
    }
}, publicationSchemaOptions);

export default dbModel('Publication', publicationSchema);