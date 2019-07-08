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
    /**
     * Create new interview
     * @name createInterview
     * @param {String} interviewer 
     * @param {String} applicant 
     * @param {DateTime} scheduledDate 
     * @param {String} adId 
     */
    createInterview(interviewer, applicant, scheduledDate, adId) {
        const interviewData = {
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
     * @name editInterview
     * @param {String} interviewId 
     * @param {Object} edits 
     */
    editInterview(interviewId, edits) {
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