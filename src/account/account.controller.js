import accountService from './account.service';

export default {
    login(req, res) {
        accountService.login(req, res)
            .then((data) => res.json({ data }))
            .catch(e => { console.log(e) });
    }
}