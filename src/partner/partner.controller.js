import partnerService from './partner.service';

export default {
    getMyProfile(req, res, next) {
        return partnerService.findById(req.account.profileId)
            .then((foundPartner) => {
                return res.json({
                    data: foundPartner
                });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    create(req, res, next) {
        const { name, countryCode } = req.body;

        return partnerService.create(name, countryCode, req.account.id)
            .then((createdPartner) => {
                req.account.setProfileId(createdPartner.id)
                    .then((savedAccount) => {
                        const data = { account: savedAccount };

                        return res.json({ data });
                    });
            })
            .catch((error) => next(error.errmsg || error));
    }
};