import cooperationsService from './cooperations.service';
import studentService from '../student/student.service';

export default {
    create(req, res, next) {
        const { account } = req;
        const { interviewId, studentId } = req.body;

        return studentService.findById(studentId)
            .then((student) => {
                cooperationsService.create(student.university, account.profile, studentId, interviewId)
                    .then((createdCooperation) => {
                        res.json({ data: createdCooperation });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
            });
    }
};