import studentService from './student.service';

export default {
    create(req, res, next) {
        const studentData = req.body;

        return studentService.create(studentData)
            .then((createdStudent) => {
                return res.json({
                    data: createdStudent
                });
            })
            .catch((error) => {
                next({
                    status: 409,
                    message: error.errmsg || error
                })
            });
    }
};