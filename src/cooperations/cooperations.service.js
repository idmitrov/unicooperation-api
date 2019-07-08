import Cooperation from './cooperation.model';

export default {
    /**
     * Create new cooperation between Student University and Partner
     * @name create
     * @param {String} university The id of the university
     * @param {String} partner The id of the partner
     * @param {String} student The id of the student
     */
    create(university, partner, student) {
        const cooperation = new Cooperation({ university, partner, student });

        return cooperation.save();
    }
};