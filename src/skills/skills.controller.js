import skillsService from "./skills.service";

export default {
    create(req, res, next) {
        const { name, level } = req.body;

        skillsService.create(name, level)
            .then((createdSkill) => {
                res.json({ data: createdSkill });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    filter(req, res, next) {
        const { skill } = req.query;

        skillsService.filter(skill)
            .then((skills) => {
                const data = {
                    list: skills
                };
                
                res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    }
}