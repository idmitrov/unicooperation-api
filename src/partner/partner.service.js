import Partner from './partner.model';

export default {
    findById(id, projection = []) {
        return Partner
            .findById(id)
            .select(projection);
    },
    create(name, countryCode, accountId) {        
        const newPartner = new Partner({name, countryCode, accountId});

        return newPartner.save();
    }
}