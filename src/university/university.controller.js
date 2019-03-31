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
        const universityData = req.body;

        return universityService.create(universityData)
            .then((createdUniversity) => {
                return res.json({
                    data: createdUniversity
                });
            });
    }
};