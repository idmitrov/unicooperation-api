import Interview from './interview.model';

const allowedInterviewProps = [
    'succeeded',
    'accepted',
    'rejected',
    'scheduledDate',
    'applicant',
    'address',
    'interviewer',
    'ad',
    'title',
    'description',
    'isActive'
];

export default {
    getOneByCriteria(criteria, projection = []) {
        return Interview
            .findOne(criteria)
            .select(projection);
    },
    getByCriteria(criteria, projection = []) {
        return Interview
            .find(criteria)
            .select(projection);
    },
    /**
     * Get an interview by id
     * @name getById
     * @param {String} interviewId 
     * @param {Array} projection 
     */
    getById(interviewId, projection) {
        return Interview
            .findById(interviewId)
            .select(projection);
    },
    /**
     * Create new interview
     * @name create
     * @param {String} title
     * @param {String} description
     * @param {String} interviewer 
     * @param {String} applicant 
     * @param {DateTime} scheduledDate 
     * @param {String} adId 
     */
    create(title, description, interviewer, applicant, adId, scheduledDate) {
        const interviewData = {
            title,
            description,
            interviewer,
            applicant,
            scheduledDate,
            ad: adId
        };

        const interview = new Interview(interviewData);

        return interview.save();
    },
    /**
     * Edit an exising interview
     * @name edit
     * @param {String} interviewId 
     * @param {Object} edits 
     */
    edit(interviewId, interviewerId, edits) {
        return Interview.findById(interviewId)
            .then((interview) => {
                if (!interview) {
                    throw new Error('Interview does not exist');
                }
                
                if (!interview.interviewer.equals(interviewerId) && !interview.applicant.equals(interviewerId) ) {
                    throw new Error('Unauthorized');
                }

                Object.keys(edits)
                    .forEach((editKey) => {
                        if (allowedInterviewProps.includes(editKey)) {
                            interview[editKey] = edits[editKey];
                        }
                    });

                return interview.save();
            });
    }
};