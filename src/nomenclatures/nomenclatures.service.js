import Country from "./country.nom";

export default {
    getCountries() {
        return Country.find({});
    }
}