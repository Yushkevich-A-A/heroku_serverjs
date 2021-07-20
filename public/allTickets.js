export default class allTickets {
    constructor() {
        this.count = 0
        this.allTickets = [];
    }

    addTicket(data) {
        this.allTickets.push(data);
    }

    deleteTicket(id) {
        const index = this.allTickets.findIndex( item => item.id === id);
        if (index !== -1) {
            this.allTickets.splice(index, 1);
            return true;
        }
        return false;
    }

    getAllTickets() {
        return this.allTickets.map( item => {
            
        });
    }
}