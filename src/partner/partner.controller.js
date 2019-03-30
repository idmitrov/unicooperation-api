import partnerService from './partner.service';

export default {
    create(req, res, next) {
        const partnerData = req.body;

        return partnerService.create(partnerData)
            .then((createdPartner) => {
                return res.json({
                    data: createdPartner
                });
            })
            .catch((error) => next(error.errmsg || error));
    }
};