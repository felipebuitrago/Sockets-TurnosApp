const TicketControl = require("../models/TicketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('disconnect', () => {
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        socket.broadcast.emit('siguiente-ticket', payload );
    })
}


module.exports = {
    socketController
}

