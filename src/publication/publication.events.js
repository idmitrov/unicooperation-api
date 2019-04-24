import { accountType } from '../account/account.constants';
import studentService from '../student/student.service';

import { subscribeForEvent, joinRoom } from '../socket';

export const publicationEventTypes = {
    join: 'join'
};

export default (client) => {
    subscribeForEvent(publicationEventTypes.join, client, () => {
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
                joinRoom(account.profileId, client);
                break;
            }
            default: throw new Error('Invalid account type tried to join');
        }
    });
}