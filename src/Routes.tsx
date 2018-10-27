import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import { lazyInject } from './IoC';
import { AirportsStore } from './stores/AirportsStore';
import Departures from './components/Departures/Departures';
import Arrivals from './components/Arrivals/Arrivals';
import Delayed from './components/Delayed/Delayed';
import FlightInfo from './components/FlightInfo/FlightInfo';


@observer
class Routes extends React.Component<RouteComponentProps> {
  @lazyInject(AirportsStore)
  airportStore: AirportsStore;

  render() {
    const { selectedAirport } = this.airportStore;

    return (
      <Switch>
        <Route path='/flight/:flightNumber' component={FlightInfo}/>
        {selectedAirport ?
          <React.Fragment>
            <Route path='/departures' render={() => <Departures airport={selectedAirport}/>} />
            <Route path='/arrivals' render={() => <Arrivals airport={selectedAirport}/>} />
            <Route path='/delayed' render={() => <Delayed airport={selectedAirport}/>} />
          </React.Fragment>
          :
          <h2 style={{ textAlign: 'center', fontSize: '28px' }}>Please select an airport</h2>
        }
      </Switch>
    );
  }
}

export default withRouter(Routes);
