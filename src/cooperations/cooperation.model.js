import { dbSchema, dbModel } from '../db';

const cooperationSchemaOptions = {
    timestamps: true
};

const cooperationSchema = new dbSchema({
    university: {
        type: dbSchema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    partner: {
        type: dbSchema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },
    student: {
        type: dbSchema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    interview: {
        type: dbSchema.Types.ObjectId,
        ref: 'Interview',
        default: null
    }
}, cooperationSchemaOptions);

cooperationSchema.index({ student: 1, partner: 1, university: 1 }, { unique: true });

export default dbModel('Cooperation', cooperationSchema);