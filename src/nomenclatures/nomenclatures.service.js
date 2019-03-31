import Country from "./country.nom";

export default {
    getCountries() {
        return Country
            .find({})
            .select(['-_id', '-__v']);
    }
}