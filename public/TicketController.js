export default class TicketController {
    constructor() {
        this.count = 0
        this.allTickets = [];
        this.desriptions = [];
    }

    addTicket(data) {
        data.ticket.id = this.count;
        this.allTickets.push(data);
        this.count++;
    }

    getTicket(id) {
        const index = this.allTickets.findIndex( item => item.ticket.id === id);
        if (index !== -1) {
            return this.allTickets[index];
        }
        return false;
    }

    deleteTicket(id) {
        const index = this.allTickets.findIndex( item => item.ticket.id === id);
        if (index !== -1) {
            this.allTickets.splice(index, 1);
            return true;
        }
        return false;
    }

    getAllTickets() {
        return this.allTickets.map( item => {
            item.ticket;
        });
    }
}