import { accountType } from '../account/account.constants';
import studentService from '../student/student.service';
import publicationService from './publication.service';

const rooms = {};

/**
 * Add a socket to room
 * @name addClientToRoom
 * @param {String} roomId 
 * @param {Soc} client 
 */
const addClientToRoom = (roomId, client) => {
    rooms[roomId] ? rooms[roomId].push(client) : rooms[roomId] = [client];
}

/**
 * Remove a socket from room
 * @name addClientToRoom
 * @param {String} roomId 
 * @param {Soc} client 
 */
const removeClientFromRoom = (roomId, clientId) => {
    const room = rooms[roomId];
    const clientToRemoveIndex = room.findIndex((c) => client.id === clientId);

    room.splice(clientToRemoveIndex, 1);
}

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