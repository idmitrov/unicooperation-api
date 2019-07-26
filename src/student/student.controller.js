import studentService from './student.service';

export default {
    match(req, res, next) {
        const result = {
            data: {
                list: [],
                total: 0
            }
        };

        const { account } = req;
        const { page, limit } = req.query;
        
        let filters = {};
        Object.keys(req.query)
            .forEach((key) => {
                if (req.query[key] !== 'null') {
                    filters[key] = req.query[key];
                }
            })

        return account.getProfile()
            .then((profile) => {
                const query = Object.assign({}, filters, {
                    university: profile.universities
                });

                return query;
            })
            .then((query) => studentService.match(query, page, limit))
            .then(([foundStudents, totalStudents]) => {
                result.list = foundStudents,
                result.total = totalStudents

                return res.json({ data: result });
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

        studentService.findByIdAndUpdate(req.account.profile, update)
            .then((updatedStudent) => {
                return res.json({ data: updatedStudent });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    me(req, res, next) {
        studentService.findById(req.account.profile)
            .then((foundProfile) => {
                return res.json({ data: foundProfile });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    preview(req, res, next) {
        return studentService.getPreview(req.params.id)
            .then((foundStudent) => {
                const data = foundStudent;

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    create(req, res, next) {
        const { firstName, facultyId, university } = req.body;

        return studentService.create(firstName, facultyId, university, req.account.id)
            .then((createdStudent) => {
                req.account.setProfile(createdStudent.id)
                    .then((savedAccount) => {
                        const data = { account: savedAccount.getPublicFields() };

                        return res.json({ data });
                    });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    }
};