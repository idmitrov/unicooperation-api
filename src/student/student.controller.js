import studentService from './student.service';

export default {
    create(req, res, next) {
        const { firstName, facultyId, universityId } = req.body;

        return studentService.create(firstName, facultyId, universityId, req.account.id)
            .then((createdStudent) => {
                // TODO: Extract it in account controller/edit
                req.account.profileId = createdStudent.id;
                req.account.save()
                    .then((savedAccount) => {
                        return res.json({ savedAccount, createdStudent});
                    });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    }
};