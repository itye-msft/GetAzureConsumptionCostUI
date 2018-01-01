import React, { Component } from 'react';
import ApiUI from './ApiUI';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Form, FormGroup, Label, Input, FormText,
  Table
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this);
    this.onRequestStart = this.onRequestStart.bind(this);
    this.onRequestEnd = this.onRequestEnd.bind(this);

    this.state = {
      consumptionData: [],
      total:0
    };
  }
  
  onRequestStart() {
    this.setState({
      consumptionData:[],
      total:0
    })
  }
  onRequestEnd(data) {
    let details=[];
    for (var key in data.details) {
      details.push(data.details[key]);
    }
    this.setState({
      consumptionData:details,
      total:data.total
    });
  }

  renderTable() {
    const TableRow = ({row}) => (
      <tr>
         <td key={row.name}>{row.name}</td>
         <td key={row.rate}>{row.rate}</td>
         <td key={row.consumption}>{row.consumption}</td>
         <td key={row.cost}>{row.cost}</td>
         <td key={row.region}>{row.region}</td>
      </tr>
    )
    let data = this.state.consumptionData;
    
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Meter Name</th>
            <th>Rate</th>
            <th>Consumption</th>
            <th>Cost</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          { data.map(row => <TableRow row={row} />) }
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Azure consumption estimation tool</h1>
                <hr className="my-2" />
                <p/>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <ApiUI onRequestStart={this.onRequestStart} onRequestEnd={this.onRequestEnd} />
              </Col>
              <Col md="6">
                <h2>Total cost: {Math.round(this.state.total* 100) / 100}</h2>
                {this.renderTable()}
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;