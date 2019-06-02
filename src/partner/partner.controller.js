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
    updateMyProfile(req, res, next) {
        let update = req.body;

        if (req.files && req.files.length) {
            update = {
                avatar: req.files[0].location
            };
        }

        partnerService.findByIdAndUpdate(req.account.profileId, update)
            .then((updatedPartner) => {
                return res.json({ data: updatedPartner });
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
    },
    filterByName(req, res) {
        const { name, skip, take } = req.query;

        if (!name) {
            return res.json({
                data: []
            });
        }

        return partnerService.filterByName(name, skip, take, ['name', 'rating', 'avatar'])
            .then((foundUniversities) => {
                return res.json({ data: foundUniversities });
            });
    },
};