import * as React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { lazyInject } from '../../IoC';
import { FlightsStore } from '../../stores/FlightsStore';
import { IFlightInfo } from '../../stores/IFlightInfo';
import * as moment from 'moment';

const { Column, ColumnGroup } = Table;

interface IProps {
  airport: string;
}

@observer
class Delayed extends React.Component<IProps> {
  @lazyInject(FlightsStore)
  flightsStore: FlightsStore;

  componentWillMount() {
    this.flightsStore.fetchFlights('departure', this.props.airport);
    this.flightsStore.fetchFlights('arrival', this.props.airport);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.flightsStore.fetchFlights('departure', nextProps.airport);
    this.flightsStore.fetchFlights('arrival', nextProps.airport);
  }

  render() {
    return (
      <div>
        <h1>Delayed</h1>
        <Table dataSource={this.flightsStore.delayed}
               loading={this.flightsStore.loading.departure || this.flightsStore.loading.arrival}
        >
          <Column title='Flight' dataIndex='flight.iataNumber' />
          <Column title='Type' dataIndex='type' />
          <ColumnGroup title='Departure'>
            <Column title='Airport' dataIndex='departure.iataCode' />
            <Column title='Scheduled' key='departureScheduledTime'
                    render={(text, record: IFlightInfo) =>
                      moment(record.departure.scheduledTime).format('DD.MM.YYYY | HH:mm')}
            />
            <Column title='Delay(min)' dataIndex='departure.delay' />
            <Column title='Estimated' key='departureEstimatedTime'
                    render={(text, record: IFlightInfo) =>
                      moment(record.departure.estimatedTime).format('DD.MM.YYYY | HH:mm')}
            />
          </ColumnGroup>
          <ColumnGroup title='Arrival'>
            <Column title='Airport' dataIndex='arrival.iataCode' />
            <Column title='Scheduled Time' dataIndex='arrival.scheduledTime'
                    render={(text, record: IFlightInfo) =>
                      moment(record.arrival.scheduledTime).format('DD.MM.YYYY | HH:mm')}
            />
            <Column title='Delay(min)' dataIndex='arrival.delay' />
            <Column title='Estimated' key='arrivalEstimatedTime'
                    render={(text, record: IFlightInfo) =>
                      moment(record.arrival.estimatedTime).format('DD.MM.YYYY | HH:mm')}
            />
          </ColumnGroup>
          <Column title='Status' dataIndex='status' />
        </Table>
      </div>
    );
  }
}

export default Delayed;
