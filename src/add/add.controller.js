import addService from "./add.service";

export default {
    getAdds(req, res, next) {
        addService.getAdds()
            .then(([adds, total]) => {
                const data = {
                    list: adds,
                    total: total
                };

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    createNewAdd(req, res, next) {

    }
}