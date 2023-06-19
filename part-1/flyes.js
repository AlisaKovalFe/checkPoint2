class Flight {
  constructor(args = {}) {
    this.ticketList = args.ticketList
    this.luggage = []
    this.passengers = []
  }

  boarding(passengers) {
    this.ticketControl(passengers)
    this.checkingBag(this.passengers)
  }

  checkingBag(passengers) {
    this.luggage = passengers.map((el) => {
      if (el.luggage.length !== 0) return { ticket: el.ticket, luggage: el.luggage }
    })
    this.passengers = passengers.map((el) => {
      el.luggage = []
      return el
    })

    return this.passengers
  }


  ticketControl(passengers) {
    this.passengers = passengers.filter((el) => this.ticketList.includes(el.ticket))
    return this.passengers
  }

  baggageСlaim() {
    this.passengers.map((el, index) => {
      if (this.luggage[index].ticket == el.ticket) {
        el.luggage = this.luggage[index].luggage
      }
    })

    this.luggage = []
    return this.passengers
  }
}







module.exports = Flight;
