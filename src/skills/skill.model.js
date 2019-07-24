import { dbSchema, dbModel } from '../db';

const skillSchemaOptions = {
    timestamps: true
};

const skillSchema = new dbSchema({
    /**
     * @name name
     * @type String
     */
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    /**
     * @name level
     * @type Number
     */
    level: {
        type: Number,
        default: 1
    }
}, skillSchemaOptions);

skillSchema.index({ university: 1, facultyId: 1 }, { unique: true })

export default dbModel('Skill', skillSchema);