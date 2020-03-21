import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MokeNav } from './client/nav';
import { AdminRouter, ClientRouter } from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { initializeIcons } from '@uifabric/icons';
import store from '../redux';

initializeIcons();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container fluid>
          <Row>
            <Route path="/" exact >
              <Redirect to="/client" />
            </Route >
            <Route path="/client">
              <Col md={3} sm={0} className={"moke-app-nav fixed-top"}>
                <aside>
                  <nav>
                    <MokeNav />
                  </nav>
                </aside>
              </Col>
              <Col md={{ span: 9, offset: 3 }} className={"moke-app-main"}>
                <main>
                  <article>
                    <ClientRouter />
                  </article>
                </main>
              </Col>
            </Route>
            <Route path="/admin">
              <Col md={3} sm={0} className={"moke-app-nav fixed-top"}>
                <aside>
                  <nav>
                    
                  </nav>
                </aside>
              </Col>
              <Col md={{ span: 9, offset: 3 }} className={"moke-app-main"}>
                <main>
                  <article>
                    <AdminRouter />
                  </article>
                </main>
              </Col>
            </Route>
          </Row>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
