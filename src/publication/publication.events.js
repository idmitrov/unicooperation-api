import { accountType } from '../account/account.constants';
import studentService from '../student/student.service';

import { addClientToRoom } from '../socket';

export default (client) => {
    client.on('join', () => {
        const { account } = client;

        switch (account.type) {
            case accountType.student: {
                studentService.findById(account.profileId)
                    .then((student) => {
                        client.join(student.universityId);

                        addClientToRoom(student.universityId, client);
                    });
                break;
            }
            case accountType.university: {
                client.join(student.universityId);

                addClientToRoom(account.id, client);
                break;
            }
            default: throw new Error('Invalid account type tried to join');
        }
    });
}