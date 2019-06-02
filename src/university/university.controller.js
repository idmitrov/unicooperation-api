import universityService from './university.service';

export default {
    me(req, res, next) {
        return universityService.findById(req.account.profileId)
            .then((foundUniversity) => {
                return res.json({
                    data: foundUniversity
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

        return universityService.findByIdAndUpdate(req.account.profileId, update)
            .then((updatedUniversity) => {
                return res.json({
                    data: updatedUniversity
                });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    findByName(req, res) {
        const { name } = req.params;

        return universityService.findByName(name, ['name', 'rating', 'avatar'])
            .then((foundUniversities) => {
                return res.json({
                    data: foundUniversities
                });
            });
    },
    filterByName(req, res) {
        const { name, skip, take } = req.query;

        if (!name) {
            return res.json({
                data: {
                    list: [],
                    total: 0
                }
            });
        }

        return universityService.filterByName(name, skip, take, ['name', 'rating', 'avatar'])
            .then((foundUniversities) => {
                const data = {
                    list: foundUniversities,
                    total: foundUniversities.length
                };

                return res.json({ data });
            });
    },
    create(req, res) {
        const { name, countryCode } = req.body;
        
        return universityService.create(name, countryCode, req.account.id)
            .then((createdUniversity) => {
                req.account.setProfileId(createdUniversity.id)
                    .then((savedAccount) => {
                        const data = { account: savedAccount };
                        
                        return res.json({ data });
                    });
            });
    }
};