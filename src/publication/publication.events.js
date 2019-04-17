import accountService from '../account/account.service';

const connections = {};

export default (client) => {
    client.on('join', () => {
        connections[client.account.id] = client;
    });
}