import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';
import store from '../redux';
import { Container, Row, Col, ButtonGroup, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Container>
          <Row>
            <Col md={3} className="moke-app-nav">

            </Col>
            <Col md={9}>

            </Col>
          </Row>

          <Switch>

          </Switch>
        </Container>
      </HashRouter>
    </Provider>
  );
}

export default App;
