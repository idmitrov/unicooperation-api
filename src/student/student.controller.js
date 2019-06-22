import studentService from './student.service';

export default {
    match(req, res, next) {
        if (!req.query.title) {
            return res.json({
                data: {
                    students: [],
                    total: 0
                }
            });
        }

        const { account } = req;
        const { page, limit } = req.query;
        
        return account.getProfile()
            .then((accountWithProfile) => {
                const profile = accountWithProfile.profileId;
                
                const query = Object.assign({}, req.query, {
                    universityId: profile.universities
                });
        
                return query;
            })
            .then((query) => studentService.match(query, page, limit, ['-account']))
            .then(([foundStudents, totalStudents]) => {
                const data = {
                    students: foundStudents,
                    total: totalStudents
                };

                return res.json({ data });
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

        studentService.findByIdAndUpdate(req.account.profileId, update)
            .then((updatedStudent) => {
                return res.json({ data: updatedStudent });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    me(req, res, next) {
        studentService.findById(req.account.profileId)
            .then((foundProfile) => {
                return res.json({ data: foundProfile });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    create(req, res, next) {
        const { firstName, facultyId, universityId } = req.body;

        return studentService.create(firstName, facultyId, universityId, req.account.id)
            .then((createdStudent) => {
                req.account.setProfileId(createdStudent.id)
                    .then((savedAccount) => {
                        const data = { account: savedAccount };

                        return res.json({ data });
                    });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    }
};