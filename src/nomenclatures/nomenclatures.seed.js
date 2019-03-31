import Country from './country.nom';

export const seedCountries = () => {
    Country.find({})
        .then((countries) => {
            if (!countries.length) {
                Country.seed();
            }
        })
}

export default () => {
    seedCountries();
}