import adminService from './admin.service';

export default {
    create(req, res, next) {
        const adminData = req.body;

        return adminService.create(adminData)
            .then((createdAdmin) => {
                return res.json({
                    data: createdAdmin
                });
            })
            .catch((error) => next(error.errmsg || error));
    }
};