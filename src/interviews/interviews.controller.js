import interviewsService from './interviews.service';
import { accountType } from '../account/account.constants';

export default {
    getMineInterviews(req, res, next) {
        const { account } = req;
        let criteria = null;
        
        if (account.type === accountType.partner) {
            criteria = { interviewer: account.profile };
        } else if (account.type === accountType.student) {
            criteria = { applicant: account.profile, rejected: false };
        }

        if (criteria) {
            criteria.isActive = true;

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
    get(req, res, next) {
        const { account } = req;
        const { interviewId } = req.params;
        let criteria = null;
        
        if (account.type === accountType.partner) {
            criteria = { interviewer: account.profile };
        } else if (account.type === accountType.student) {
            criteria = { applicant: account.profile, rejected: false };
        }

        if (criteria) {
            criteria._id = interviewId;
            criteria.isActive = true;

            interviewsService.getOneByCriteria(criteria)
                .then((foundInterview) => {
                    res.json({ data: foundInterview });
                })
                .catch((error) => next({ message: error.errmsg || error }));
        }
    },
    create(req, res, next) {
        const { account } = req;
        const { applicant, scheduledDate, ad, title, description } = req.body;

        interviewsService.create(title, description, account.profile, applicant, ad, scheduledDate)
            .then((arangedInterview) => {
                res.json({
                    data: arangedInterview
                })
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    edit(req, res, next) {
        const { interview } = req.body;

        interviewsService.edit(interview._id, interview)
            .then((arangedInterview) => {
                res.json({
                    data: arangedInterview
                })
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    answer(req, res, next) {
        const { interviewId, accepted } = req.body;
        const edits = { accepted };

        if (!accepted) {
            edits.rejected = true;
        }

        interviewsService.edit(interviewId, edits)
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