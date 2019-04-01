import universityService from './university.service';

export default {
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

        return universityService.filterByName(name, skip, take)
            .then((foundUniversities) => {
                return res.json({ data: foundUniversities });
            });
    },
    create(req, res) {
        const { name, countryCode } = req.body;
        
        return universityService.create(name, countryCode, req.account.id)
            .then((createdUniversity) => {
                // TODO: Extract it in account controller/edit
                req.account.profileId = createdUniversity.id;
                req.account.save()
                    .then((savedAccount) => {
                        return res.json({ savedAccount, createdUniversity});
                    });
            });
    }
};