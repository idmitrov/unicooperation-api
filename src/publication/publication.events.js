import { accountType } from '../account/account.constants';
import studentService from '../student/student.service';

import { subscribeForEvent, joinRoom } from '../socket';

export default (client) => {
    subscribeForEvent('join', client, () => {
        const { account } = client;

        switch (account.type) {
            case accountType.student: {
                studentService.findById(account.profileId)
                    .then((student) => {
                        joinRoom(student.universityId, client);
                    });
                break;
            }
            case accountType.university: {
                joinRoom(student.universityId, client);
                break;
            }
            default: throw new Error('Invalid account type tried to join');
        }
    });
}