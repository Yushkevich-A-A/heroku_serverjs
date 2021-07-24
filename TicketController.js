class TicketController {
    constructor() {
        this.count = 0
        this.allTickets = [];
        this.desriptions = [];
    }

    getAllTickets() {
        return this.allTickets;
    }

    getTicket(id) {
        const index = this.allTickets.findIndex( item => item.id === id);
        if (index !== -1) {
            return this.desriptions[index];
        }
        return false;
    }

    addTicket(data) {
        data.ticket.id = this.count;
        this.allTickets.push(data.ticket);
        this.desriptions.push(this.getArrayFromText(data.description));
        this.count++;
        return true;
    }

    editTicket(id, brief, full) {
        const index = this.allTickets.findIndex( item => item.id === id);
        if (index !== -1) {
            this.allTickets[index].name = brief;
            this.desriptions[index] = this.getArrayFromText(full);
            return true;
        }
        return false;
    }

    deleteTicket(id) {
        console.log(id);
        const index = this.allTickets.findIndex( item => item.id === id);
        if (index !== -1) {
            this.allTickets.splice(index, 1);
            this.desriptions.splice(index, 1);
            return true;
        }
        return false;
    }

    
    getArrayFromText(data) {
        return data.split('\r\n');
    }
}

module.exports = {
    TicketController,
  }