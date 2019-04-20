import { accountType } from '../account/account.constants';
import studentService from '../student/student.service';
import publicationService from './publication.service';

export default (client) => {
    client.on('join', () => {
        const { account } = client;

        switch (account.type) {
            case accountType.student: {
                studentService.findById(account.profileId)
                    .then((student) => publicationService.join(student.universityId, client));
                break;
            }
            case accountType.university: {
                publicationService.join(account.id, client);

                break;
            }
            default: throw new Error('Invalid account type tried to join');
        }
    });
}