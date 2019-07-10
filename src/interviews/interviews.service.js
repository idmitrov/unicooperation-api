import Interview from './interview.model';

const allowedInterviewProps = [
    'succeeded',
    'acceptDate',
    'accepted',
    'scheduledDate',
    'applicantNotes',
    'applicant',
    'interviewerNotes',
    'address',
    'interviewer',
    'ad'
];

export default {
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
     * @param {String} interviewer 
     * @param {String} applicant 
     * @param {DateTime} scheduledDate 
     * @param {String} adId 
     */
    create(title, interviewer, applicant, adId, scheduledDate) {
        const interviewData = {
            title,
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
    edit(interviewId, edits) {
        return Interview.findById(interviewId)
            .then((interview) => {
                if (!interview) {
                    throw new Error('Interview does not exist');
                }

                edits.forEach((editKey) => {
                    if (allowedInterviewProps.includes(editKey)) {
                        interview[editKey] = edits[editKey];
                    }
                });

                return interview.save();
            });
    }
};