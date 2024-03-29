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

                studentService.findById(account.profile)
                    .then((student) => {
                        joinRoom(student.university, client);
                    });
                break;
            }
            case accountType.university: {
                joinRoom(account.profile, client);
                break;
            }
            default: console.error('Invalid account type tried to join');
        }
    });
}