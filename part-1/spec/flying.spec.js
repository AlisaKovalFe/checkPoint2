const Flight = require('../flyes');
const Ticket = require('../tickets');
const Passenger = require('../passenger');

describe('Тесты рейса', () => {
  let args;
  let passengers;
  let filteredArr;
  let luggage;
  let ticket1;
  let ticket2;
  let ticket3;
  let ticket4;
  let ticket5;
  let pass1;
  let pass2;
  let pass3;
  let pass4;
  let flightToMilan;

  beforeEach(() => {
    ticket1 = new Ticket('71027174523', 120);
    ticket2 = new Ticket('62548104637', 120);
    ticket3 = new Ticket('84620962649', 120);
    ticket4 = new Ticket('85246295612', 120);
    ticket5 = new Ticket('09384363547', 120);

    pass1 = new Passenger({ name: 'John Smith', ticket: ticket1, luggage: ['notebook', 'bag'] });
    pass2 = new Passenger({ name: 'Байкова Яна', ticket: ticket2, luggage: ['frying pan', 'backpack'] });
    pass3 = new Passenger({ name: 'Зеленов Болеслав', ticket: ticket3, luggage: ['cat', 'backpack'] });
    pass4 = new Passenger({ name: 'Уланова Алевтина', ticket: ticket5, luggage: ['fishing rod', 'backpack'] });

    passengers = [
      pass1,
      pass2,
      pass3,
      pass4,
    ];

    args = {
      ticketList: [
        ticket1,
        ticket2,
        ticket3,
        ticket4,
      ],
    };

    flightToMilan = new Flight(args);
  });

  describe('Имеет свойства и методы', () => {
    it('boarding', () => {
      expect(flightToMilan.boarding).toBeTruthy();
    });
    it('checkingBag', () => {
      expect(flightToMilan.checkingBag).toBeTruthy();
    });
    it('ticketControl', () => {
      expect(flightToMilan.ticketControl).toBeTruthy();
    });
    it('baggageСlaim', () => {
      expect(flightToMilan.baggageСlaim).toBeTruthy();
    });
  });

  describe('Проверка работы методов', () => {
    it('Метод ticketControl возвращает массив пассажиров у которых есть билеты содержащиеся в массиве ticketList рейса', () => {
      filteredArr = [
        pass1,
        pass2,
        pass3,
      ];
      expect(flightToMilan.ticketControl(passengers)).toStrictEqual(filteredArr);
    });

    it('Метод checkingBag принимает массив пассажиров с багажом(luggage) ', () => {
      const passengersWithoutLaggage = flightToMilan.checkingBag(passengers);
      expect(passengersWithoutLaggage.every((el) => el.luggage.length === 0)).toBeTruthy();
    });

    it('Метод checkingBag устанавливает значение flightToMilan.luggage массив объектов с вещами пассажиров', () => {
      filteredArr = [
        pass1,
        pass2,
        pass3,
        pass4,
      ];

      luggage = [
        { ticket: ticket1, luggage: ['notebook', 'bag'] },
        { ticket: ticket2, luggage: ['frying pan', 'backpack'] },
        { ticket: ticket3, luggage: ['cat', 'backpack'] },
        { ticket: ticket5, luggage: ['fishing rod', 'backpack'] },
      ];

      expect(flightToMilan.checkingBag(passengers)).toStrictEqual(filteredArr);
      expect(flightToMilan.luggage).toStrictEqual(luggage);
    });

    it('Метод boarding использует методы класса 1) Проверяет билеты 2) Вещи пассажиров сданы в багаж 3) Пассажиры записаны в свойство пассажиров полета ', () => {
      flightToMilan.boarding(passengers);

      luggage = [
        { ticket: ticket1, luggage: ['notebook', 'bag'] },
        { ticket: ticket2, luggage: ['frying pan', 'backpack'] },
        { ticket: ticket3, luggage: ['cat', 'backpack'] },
      ];

      filteredArr = [
        pass1,
        pass2,
        pass3,
      ];

      expect(flightToMilan.luggage).toStrictEqual(luggage);
      expect(flightToMilan.passengers).toStrictEqual(filteredArr);
    });

    it('Метод baggageСlaim возвращает сданные в багаж вещи пассажирам, багажное отделение очищается', () => {
      flightToMilan = new Flight(args);

      luggage = [
        { ticket: ticket1, luggage: ['notebook', 'bag'] },
        { ticket: ticket2, luggage: ['frying pan', 'backpack'] },
        { ticket: ticket3, luggage: ['cat', 'backpack'] },
        { ticket: ticket5, luggage: ['fishing rod', 'backpack'] },
      ];

      const passengersWithoutLaggage = [
        pass1 = new Passenger({ name: 'John Smith', ticket: ticket1, luggage: [] }),
        pass2 = new Passenger({ name: 'Байкова Яна', ticket: ticket2, luggage: [] }),
        pass3 = new Passenger({ name: 'Зеленов Болеслав', ticket: ticket3, luggage: [] }),
        pass4 = new Passenger({ name: 'Уланова Алевтина', ticket: ticket5, luggage: [] }),
      ];

      flightToMilan.luggage = luggage;
      flightToMilan.passengers = passengersWithoutLaggage;

      expect(flightToMilan.baggageСlaim()).toStrictEqual(passengers);
      expect(flightToMilan.luggage.length).toBe(0);
    });
  });
});
