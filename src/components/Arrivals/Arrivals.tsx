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
class Arrivals extends React.Component<IProps> {
  @lazyInject(FlightsStore)
  flightsStore: FlightsStore;

  componentWillMount() {
    this.flightsStore.fetchFlights('arrival', this.props.airport);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.flightsStore.fetchFlights('arrival', nextProps.airport);
  }

  render() {
    return (
      <div>
        <h1>Arrivals</h1>
        <Table dataSource={this.flightsStore.arrival} loading={this.flightsStore.loading.arrival}>
          <Column title='Flight' dataIndex='flight.iataNumber' />
          <Column title='Terminal' dataIndex='arrival.terminal' />
          <Column title='Scheduled time' key='arrivalScheduledTime'
                  render={(text, record: IFlightInfo) =>
                    moment(record.arrival.scheduledTime).format('DD.MM.YYYY | HH:mm')}
          />
          <Column title='Estimated time' key='arrivalEstimatedTime'
                  render={(text, record: IFlightInfo) =>
                    moment(record.arrival.estimatedTime).format('DD.MM.YYYY | HH:mm')}
          />
          <ColumnGroup title='Departure'>
            <Column title='Airport' dataIndex='departure.iataCode' />
            <Column title='Scheduled Time' dataIndex='departure.scheduledTime'
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

export default Arrivals;
