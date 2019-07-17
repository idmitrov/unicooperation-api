import Cooperation from './cooperation.model';

export default {
    /**
     * Create new cooperation between Student University and Partner
     * @name create
     * @param {String} university The id of the university
     * @param {String} partner The id of the partner
     * @param {String} student The id of the student
     * @param {String} interview The id of the student (nullable)
     */
    create(university, partner, student, interview = null) {
        const cooperation = new Cooperation({ university, partner, student, interview });

        return cooperation.save();
    }
};