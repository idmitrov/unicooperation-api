import { genSalt, hash, compare } from 'bcrypt';

export default {
    /**
     * Generate salt
     * @param {Number} factor 
     */
    generateSalt(factor = 10) {
        return genSalt(factor);
    },
    /**
     * Generate hash
     * @param {Number} data 
     * @param {Number} salt 
     */
    generateHash(data, salt) {
        return hash(data, salt);
    },
    /**
     * Compare 2 hashes
     * @param {Number} candidateData 
     * @param {Number} data 
     */
    compareHashes(candidateData, data) {
        return compare(candidateData, data);
    }
}