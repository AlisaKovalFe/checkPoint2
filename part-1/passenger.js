class Passenger {
  constructor(args = {}) {
    this.name = args.name
    this.ticket = args.ticket
    this.luggage = args.luggage
  }
}

module.exports = Passenger;
