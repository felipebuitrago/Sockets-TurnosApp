// HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();


socket.on('connect', () => {
    
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {

    lblNuevoTicket.innerHTML = "Ticket " + ultimo; 
});

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', undefined, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket; 
    });

});