import Admin from './admin.model';

export default {
    create(adminData) {        
        const newAdmin = new Admin(adminData);

        return newAdmin.save();
    }
}
