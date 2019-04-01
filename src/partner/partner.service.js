import Partner from './partner.model';

export default {
    create(name, countryCode, accountId) {        
        const newPartner = new Partner({name, countryCode, accountId});

        return newPartner.save();
    }
}