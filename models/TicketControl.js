const path   = require('path');
const fs     = require('fs');
const Ticket = require('./Ticket');

class TicketControl {

    constructor(){

        this.ultimos4 = [];
        this.tickets  = [];
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();

        this.init();
    }

    get toJson() {
 
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {

        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');

        if( hoy === this.hoy ){
            
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        
        }else{
            this.guardarDB();
        }
    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) ) ;
    }

    siguiente() {
        this.ultimo += 1;

        const ticket = new Ticket(this.ultimo, undefined);
        this.tickets.push( ticket );

        this.guardarDB();

        return 'Ticket ' + ticket.numero; 
    }

    atenderTicket( escritorio ) {

        if (this.tickets.length === 0) {
            return undefined;
        }
        const ticket = this.tickets[0];
        this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1);
        }
        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl;