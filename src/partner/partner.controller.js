import partnerService from './partner.service';

export default {
    create(req, res, next) {
        const { name, countryCode } = req.body;

        return partnerService.create(name, countryCode, req.account.id)
            .then((createdPartner) => {
                // TODO: Extract it in account controller/edit
                req.account.profileId = createdPartner.id;
                req.account.save()
                    .then((savedAccount) => {
                        return res.json({ savedAccount, createdPartner });
                    });
            })
            .catch((error) => next(error.errmsg || error));
    }
};