import * as React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from '../Header/Header';
import Routes from '../../Routes';

const { Content, Footer } = AntLayout;

class Layout extends React.Component {
  public render() {
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '0 50px', marginTop: 20 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Routes />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Airport Board ©2018 Created by
          <a href='https://www.linkedin.com/in/artur-dedela' target='_blank'> Artur Dedela</a>
        </Footer>
      </AntLayout>
    );
  }
}

export default Layout;
