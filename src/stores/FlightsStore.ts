import { injectable } from 'inversify';
import { action, computed, observable, runInAction } from 'mobx';
import { IFlightInfo } from './IFlightInfo';
import { AviationEdgePublicAPI as API } from '../utils/AviationEdgePublicAPI';


@injectable()
export class FlightsStore {
  @observable departure: IFlightInfo[] = [];
  @observable arrival: IFlightInfo[] = [];
  @observable loading = {
    departure: false,
    arrival: false,
  };

  @computed
  get delayed() {
    const delayedDepatures = this.departure.filter(d => !!d.departure.delay);
    const delayedArrivals = this.arrival.filter(a => !!a.arrival.delay);

    return delayedDepatures.concat(delayedArrivals);
  }

  @action
  async fetchFlights(type: 'departure' | 'arrival', iataCode: string) {
    this.loading[type] = true;
    const { data } = await API.get<IFlightInfo[]>('/timetable', {
      params: { iataCode, type }
    });

    runInAction(() => {
      this[type] = data.hasOwnProperty('error') ? [] : data;
      this.loading[type] = false;
    });
  }
}