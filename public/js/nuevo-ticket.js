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

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', undefined, ( ticket ) => {
        console.log( ticket );
    });

});