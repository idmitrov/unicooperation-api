import cooperationsService from './cooperations.service';

export default {
    create(req, res, next) {
        const { account } = req;
        const { university, student } = req.body;

        cooperationsService.create(university, account.profile, student)
            .then((createdCooperation) => {
                res.json({ data: createdCooperation });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    }
};