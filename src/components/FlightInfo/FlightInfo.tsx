import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AviationEdgePublicAPI } from '../../utils/AviationEdgePublicAPI';
import { Card, Col, Row, Spin } from 'antd';
import { IFlightInfo } from './IFlightInfo';

interface IState {
  flight?: IFlightInfo;
  isLoading: boolean;
}

type IProps = RouteComponentProps<{ flightNumber: string }>;

class FlightInfo extends React.Component<IProps, IState> {
  state: IState = { isLoading: false };

  async fetchFlight(flightIata: string) {
    this.setState({ isLoading: true });

    const { data } = await AviationEdgePublicAPI.get<IFlightInfo[]>('/flights', {
      params: { flightIata }
    });

    this.setState({
      flight: data.hasOwnProperty('error') ? undefined : data[0],
      isLoading: false,
    });
  }

  componentWillMount() {
    this.fetchFlight(this.props.match.params.flightNumber);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.fetchFlight(nextProps.match.params.flightNumber);
  }

  render() {
    const { flight, isLoading } = this.state;
    if (isLoading) {
      return <Spin tip='Searching for a flight...'/>;
    }

    if (!flight) {
      return 'Flight not found!';
    }

    return (
      <React.Fragment>
        <h1>Flight {flight.flight.iataNumber}</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Card title='Departure'>
              <p>IATA Code: <b>{flight.departure.iataCode}</b></p>
              <p>ICAO Code: <b>{flight.departure.icaoCode}</b></p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Arrival'>
              <p>IATA Code: <b>{flight.arrival.iataCode}</b></p>
              <p>ICAO Code: <b>{flight.arrival.icaoCode}</b></p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Airline'>
              <p>IATA Code: <b>{flight.arrival.iataCode}</b></p>
              <p>ICAO Code: <b>{flight.arrival.icaoCode}</b></p>
            </Card>
          </Col>

          <Col span={8}>
            <Card title='Geography'>
              <p>Latitude: <b>{flight.geography.latitude}</b></p>
              <p>Longitude: <b>{flight.geography.longitude}</b></p>
              <p>Altitude: <b>{flight.geography.altitude}</b></p>
            </Card>
          </Col>

          <Col span={8}>
            <Card title='Speed'>
              <p>Horizontal: <b>{flight.speed.horizontal}</b></p>
              <p>Vertical: <b>{flight.speed.vertical}</b></p>
            </Card>
          </Col>

          <Col span={8}>
            <Card title='Aircraft'>
              <p>Registration number: <b>{flight.aircraft.regNumber}</b></p>
              <p>ICAO Code: <b>{flight.aircraft.icaoCode}</b></p>
              <p>ICAO 24: <b>{flight.aircraft.icao24}</b></p>
              <p>IATA Code: <b>{flight.aircraft.iataCode}</b></p>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default FlightInfo;
