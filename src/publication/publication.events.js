import accountService from '../account/account.service';

const connections = {

};

export default (socket) => {
    console.log(socket.handshake.query)
    
    socket.on('join', () => {
    
    });
}