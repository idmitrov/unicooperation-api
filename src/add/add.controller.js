import addService from "./add.service";

export default {
    getAdds(req, res, next) {
        addService.getAll()
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
        const { title, content }= req.body;
        const author = req.account;

        addService.create(title, content, author)
            .then((createdAdd) => {
                return res.json({ data: createdAdd });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    editExistingAdd(req, res, next) {
        const { title, content } = req.body;
        const { addId } = req.params;

        addService.edit(addId, title, content)
            .then((editedAdd) => {
                return res.json({ data: editedAdd });
            })
            .catch((error) => {
                next({ message: error.errmsg || error })
            });
    }
}