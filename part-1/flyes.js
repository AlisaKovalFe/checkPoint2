class Flight {
  constructor(args) {
    this.args = args
    this.luggage = []
    this.passengers = []
  }

  boarding(passengers) {
    let checkTickets = this.ticketControl(passengers)
    return this.passengers = this.checkingBag(checkTickets)
  }

  checkingBag(passengers) {
    let copy = JSON.parse(JSON.stringify(passengers));
    for (let i = 0; i < copy.length; i++) {
      let obj = {}
      obj.ticket = passengers[i].ticket
      obj.luggage = copy[i].luggage
      this.luggage.push(obj)
    }

    passengers.forEach((el) => el.luggage.length = 0)
    return passengers
  }


  ticketControl(passengers) {
    return passengers.filter((el) => this.args.ticketList.includes(el.ticket))
  }

  baggageСlaim() {
    let tickets = this.ticketControl(this.passengers)

    for (let i = 0; i < tickets.length; i++) {
      this.passengers[i].luggage.push(this.luggage[i].luggage[0], this.luggage[i].luggage[1])
    }

    this.luggage.forEach((el) => el.luggage.length = 0)
    return passengers
  }
}



module.exports = Flight;
