class Ticket {
  constructor(name, description = 'описание отсутствует', status = false) {
    this.ticket = {
      name: name,
      status: status,
      date: +new Date(),
    }
    this.description = description;
  }
}

module.exports = {
  Ticket,
}