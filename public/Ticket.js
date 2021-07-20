export default class Ticket {
  constructor(name, description, status = false) {
    this.ticket = {
      name: name,
      status: status,
      date: +new Date(),
    }
    this.description = description;
  }
}