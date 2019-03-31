import nomenclaturesService from "./nomenclatures.service";

export default {
    getCountries(req, res) {
        return nomenclaturesService.getCountries()
            .then(countries => res.json({ data: countries }));
    }
};