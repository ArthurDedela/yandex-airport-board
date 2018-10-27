import * as React from 'react';
import './style.css';
import { Layout, Menu, Input, Select } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { lazyInject } from '../../IoC';
import { AirportsStore } from '../../stores/AirportsStore';

const AntHeader = Layout.Header;
const Option = Select.Option;

@observer
class Header extends React.Component<RouteComponentProps> {
  @lazyInject(AirportsStore)
  airportsStore: AirportsStore;

  componentWillMount() {
    this.airportsStore.fetchAirports();
  }

  handleFlightSearch = (flightNumber: string) => {
    this.props.history.push(`/flight/${flightNumber}`);
  };

  handleAirportChange = (airportIataCode: string) => {
    this.airportsStore.selectedAirport = airportIataCode;
  };

  render() {
    return (
      <AntHeader className='header'>
        <Input.Search
          className='flight-search'
          placeholder='Enter flight IATA code'
          enterButton='Search'
          size='default'
          onSearch={this.handleFlightSearch}
        />
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[this.props.location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='/departures'><Link to='/departures'>Departures</Link></Menu.Item>
          <Menu.Item key='/arrivals'><Link to='/arrivals'>Arrivals</Link></Menu.Item>
          <Menu.Item key='/delayed'><Link to='/delayed'>Delayed</Link></Menu.Item>
        </Menu>
        <Select
          showSearch
          autoFocus
          className='airport-select'
          style={{ float: 'right' }}
          placeholder='Select airport'
          optionFilterProp='children'
          onChange={this.handleAirportChange}
        >
          {this.airportsStore.airports.map((airport => (
            <Option key={airport.codeIataAirport} value={airport.codeIataAirport}>
              {`${airport.codeIataAirport} - ${airport.nameAirport}`}
            </Option>
          )))}
        </Select>
      </AntHeader>
    );
  }
}

export default withRouter(Header);
