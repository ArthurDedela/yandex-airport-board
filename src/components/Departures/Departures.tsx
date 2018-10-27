import * as React from 'react';
import { Table } from 'antd';
import { IFlightInfo } from '../../stores/IFlightInfo';
import * as moment from 'moment';
import { lazyInject } from '../../IoC';
import { FlightsStore } from '../../stores/FlightsStore';
import { observer } from 'mobx-react';

const { Column, ColumnGroup } = Table;

interface IProps {
  airport: string;
}

@observer
class Departures extends React.Component<IProps> {
  @lazyInject(FlightsStore)
  flightsStore: FlightsStore;

  componentWillMount() {
    this.flightsStore.fetchFlights('departure', this.props.airport);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.flightsStore.fetchFlights('departure', nextProps.airport);
  }

  render() {
    return (
      <div>
        <h1>Departures</h1>
        <Table dataSource={this.flightsStore.departure} loading={this.flightsStore.loading.departure}>
          <Column title='Flight' dataIndex='flight.iataNumber' />
          <Column title='Terminal' dataIndex='departure.terminal' />
          <Column title='Scheduled time' key='departureScheduledTime'
                  render={(text, record: IFlightInfo) =>
                    moment(record.departure.scheduledTime).format('DD.MM.YYYY | HH:mm')}
          />
          <Column title='Estimated time' key='departureEstimatedTime'
                  render={(text, record: IFlightInfo) =>
                    moment(record.departure.estimatedTime).format('DD.MM.YYYY | HH:mm')}
          />
          <ColumnGroup title='Arrival'>
            <Column title='Airport' dataIndex='arrival.iataCode' />
            <Column title='Scheduled Time' dataIndex='arrival.scheduledTime'
                    render={(text, record: IFlightInfo) =>
                      moment(record.arrival.scheduledTime).format('DD.MM.YYYY | HH:mm')}
            />
          </ColumnGroup>
          <Column title='Status' dataIndex='status' />
        </Table>
      </div>
    );
  }
}

export default Departures;
