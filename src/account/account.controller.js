import accountService from './account.service';

export default {
    login(req, res) {
        const { email, password } = req.body;

        if (email && password) {
            accountService.login(req, res)
                .then((data) => res.json({ data }))
                .catch(error => res.json({ error }));
        } else {
            res
                .status(400)
                .json({ error: 'credentials not provided ' });
        }
    }
}