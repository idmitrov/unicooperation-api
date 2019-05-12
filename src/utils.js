import { genSalt, hash, compare } from 'bcryptjs';
import { createTransport } from 'nodemailer';

import Config from './config';

export default {
    /**
     * Send email
     * @param {String} from 
     * @param {String} to 
     * @param {String} subject 
     * @param {HTML} html 
     */
    sendEmail(from, to, subject, html) {
        let transporter = createTransport({
            secure: Config.smtp.secure,
            host: Config.smtp.host,
            port: Config.smtp.port,
            service: Config.smtp.service,
            auth: {
                user: Config.smtp.user,
                pass: Config.smtp.password
            }
        });

        return transporter.sendMail({ from, to, subject, html });
    },
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