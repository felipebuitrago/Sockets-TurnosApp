const TicketControl = require("../models/TicketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('disconnect', () => {
    });

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        //notificar nuevo ticket por asignar
    })

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio.'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    })
}

module.exports = {
    socketController
}

