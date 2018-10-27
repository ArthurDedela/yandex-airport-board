
export interface IFlightInfo {
  geography: {
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
  };
  speed: {
    horizontal: number;
    isGround: number;
    vertical: number;
  };
  departure: {
    iataCode: string;
    icaoCode: string;
  };
  arrival: {
    iataCode: string;
    icaoCode: string;
  };
  aircraft: {
    icaoCode: string;
    regNumber: string;
    icao24: string;
    iataCode: string;
  };
  airline: {
    iataCode: string;
    icaoCode: string;
  };
  flight: {
    iataNumber: string;
    icaoNumber: string;
    number: string;
  };
  system: {
    updated: number;
    squawk: string;
  };
  status: string;
}