
interface IDepartureInfo {
  iataCode: string;
  icaoCode: string;
  terminal: string;
  gate: string;
  delay: number;
  scheduledTime: string;
  estimatedTime: string;
  actualTime: string;
  estimatedRunway: string;
  actualRunway: string;
}

interface IArrivalInfo extends IDepartureInfo {
  baggage: string;
}

export interface IFlightInfo {
  type: string;
  status: string;
  departure: IDepartureInfo;
  arrival: IArrivalInfo;
  airline: {
    name: string;
    iataCode: string;
    icaoCode: string;
  };
  flight: {
    number: string;
    iataNumber: string;
    icaoNumber: string;
  };
}