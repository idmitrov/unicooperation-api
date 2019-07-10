import interviewsService from './interviews.service';

export default {
    create(req, res, next) {
        const { account } = req;
        const { applicant, scheduledDate } = req.body;

        interviewsService.createInterview(account.profile, applicant, scheduledDate)
            .then((arangedInterview) => {
                res.json({
                    data: arangedInterview
                })
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    accept(req, res, next) {
        const { interviewId, accepted } = req.body;
        const acceptDate = new Date();

        this.interviewsService.editInterview(interviewId, { accepted, acceptDate })
            .then((interview) => {
                res.json({ data: interview });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    complete(req, res, next) {
        const { interviewId, succeeded } = req.body;

        this.interviewsService.editInterview(interviewId, { succeeded })
            .then((interview) => {
                res.json({ data: interview });
            })
            .catch((error) => next({ message: error.errmsg || error }));

    }
}