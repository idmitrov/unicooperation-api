import studentService from './student.service';

export default {
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