import { injectable } from 'inversify';
import { action, observable, runInAction } from 'mobx';
import { AviationEdgePublicAPI } from '../utils/AviationEdgePublicAPI';

export interface IAirport {
  airportId: string;
  nameAirport: string;
  codeIataAirport: string;
  codeIcaoAirport: string;
  latitudeAirport: string;
  longitudeAirport: string;
  geonameId: string;
  timezone: string;
  GMT: string;
  nameCountry: string;
  codeIso2Country: string;
  codeIataCity: string;
}

@injectable()
export class AirportsStore {
  @observable airports: IAirport[] = [];
  @observable selectedAirport: string = '';

  @action
  async fetchAirports() {
    const { data } = await AviationEdgePublicAPI.get<IAirport[]>('/airportDatabase', {
      params: {
        codeIso2Country: 'RU'
      }
    });

    runInAction(() => this.airports = data);
  }

}