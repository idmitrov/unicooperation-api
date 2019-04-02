import partnerService from './partner.service';

export default {
    create(req, res, next) {
        const { name, countryCode } = req.body;

        return partnerService.create(name, countryCode, req.account.id)
            .then((createdPartner) => {
                req.account.setProfileId(createdPartner.id)
                    .then((savedAccount) => {
                        return res.json({ savedAccount, createdPartner});
                    });
            })
            .catch((error) => next(error.errmsg || error));
    }
};