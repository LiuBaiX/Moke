import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux';
import { Container, Row, Col } from 'react-bootstrap';
import { MokeNav } from './nav';
import { MokeRouter } from './router';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container fluid>
          <Row>
            <Col md={3} className="moke-app-nav fixed-top">
              <MokeNav />
            </Col>
            <Col md={{ span: 9, offset: 3 }}>
              <MokeRouter />
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
