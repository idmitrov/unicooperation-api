import { genSalt, hash } from 'bcrypt';

export default {
    generateSalt(factor = 10) {
        return genSalt(factor);
    },
    generateHash(data, salt) {
        return hash(data, salt);
    }
}