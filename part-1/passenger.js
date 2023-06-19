class Passenger {
  constructor({ name, ticket, luggage = [] }) {
    this.name = name
    this.ticket = ticket
    this.luggage = luggage
  }
}

module.exports = Passenger;
