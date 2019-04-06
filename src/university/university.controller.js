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
    findByName(req, res) {
        const { name } = req.params;

        return universityService.findByName(name)
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
                data: []
            });
        }

        return universityService.filterByName(name, skip, take)
            .then((foundUniversities) => {
                return res.json({ data: foundUniversities });
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