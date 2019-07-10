import interviewsService from './interviews.service';
import { accountType } from '../account/account.constants';

export default {
    getMineInterviews(req, res, next) {
        const { account } = req;
        let criteria = null;
        
        if (account.type === accountType.partner) {
            criteria = { interviewer: account.profile };
        } else if (account.type === accountType.student) {
            criteria = { applicant: account.profile };
        }

        if (criteria) {
            interviewsService.getByCriteria(criteria)
                .then((foundInterviews) => {
                    const data = { list: foundInterviews };

                    res.json({ data });
                })
                .catch((error) => next({ message: error.errmsg || error }));
        } else {
            throw new Error('Get mine interviews failed');
        }
    },
    get() {
        const { interviewId } = req.param;
        
        interviewsService.getById(interviewId)
            .then((foundInterview) => {
                res.json({ data: foundInterview });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    create(req, res, next) {
        const { account } = req;
        const { applicant, scheduledDate, ad, title } = req.body;

        interviewsService.create(title, account.profile, applicant, ad, scheduledDate)
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

        this.interviewsService.edit(interviewId, { accepted, acceptDate })
            .then((interview) => {
                res.json({ data: interview });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    complete(req, res, next) {
        const { interviewId, succeeded } = req.body;

        this.interviewsService.edit(interviewId, { succeeded })
            .then((interview) => {
                res.json({ data: interview });
            })
            .catch((error) => next({ message: error.errmsg || error }));

    }
}