import Partner from './partner.model';

export default {
    create(partnerData) {        
        const newPartner = new Partner(partnerData);

        return newPartner.save();
    }
}