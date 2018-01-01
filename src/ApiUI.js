import React, { Component } from 'react';
import './ApiUI.css';
import {
  Button,  Alert, Col,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import FaSpinner from 'react-icons/lib/fa/spinner';
import ApiHelper from './ApiHelper';
import DateTimePicker from 'react-datetime';
import fileDownload from 'react-file-download';



class ApiUI extends Component {
  constructor(props) {
    super(props);

    this.onAuthenticationClick = this.onAuthenticationClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);

    var startDate = new Date(), endDate = new Date();
    startDate.setHours(endDate.getHours() - 24);

    this.state = {
      clientId:"",
      clientSecret:"",
      tenantId:"",
      offerId:"",
      subscriptionId:"",
      detailed: true,
      filter:"",
      isAuthenticated:false,
      isAuthenticating:false,
      authError:null,
      granularity: "Daily",
      startDate:  startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate() + "T00:00:00",
      endDate: endDate.getFullYear() + "-" + (endDate.getMonth()+1) + "-" + endDate.getDate() + "T00:00:00"
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleDateInputChange(date) {

  }
  
  onDownloadClick() {
    this.props.onRequestStart();
    this.setState({
        isAuthenticating: true,
        authError:null
    });
    let that = this;
    ApiHelper.DownloadRates(this.state.clientId, this.state.clientSecret, this.state.tenantId , this.state.subscriptionId, this.state.offerId, this.state.detailed, this.state.filter, this.state.granularity, this.state.startDate, this.state.endDate)
    .then(function (response) {
      if(response.data.hasOwnProperty("error")){
        that.setState({
          authError: "Server error: "+response.data.error,
          isAuthenticated: false,
          isAuthenticating: false
       });
      }
      else {
        that.setState({
           isAuthenticated:true,
           isAuthenticating:false
        });
      }
      fileDownload(response.data, 'report.csv');
    })
    .catch(error =>{
      var msg = error.message.toString();
        this.setState({
            authError: msg,
            isAuthenticated: false,
            isAuthenticating: false
         });
    });
  }

  onAuthenticationClick() {
    this.props.onRequestStart();
    this.setState({
        isAuthenticating: true,
        authError:null
    });
    let that = this;
    ApiHelper.GetRates(this.state.clientId, this.state.clientSecret, this.state.tenantId , this.state.subscriptionId, this.state.offerId, this.state.detailed, this.state.filter, this.state.granularity, this.state.startDate, this.state.endDate)
    .then(function (response) {
      if(response.data.hasOwnProperty("error")){
        that.setState({
          authError: "Server error: "+response.data.error,
          isAuthenticated: false,
          isAuthenticating: false
       });
      }
      else {
        that.setState({
           isAuthenticated:true,
           isAuthenticating:false
        });
        that.props.onRequestEnd(response.data);
      }
      
    })
    .catch(error =>{
      var msg = error.message.toString();
        this.setState({
            authError: msg,
            isAuthenticated: false,
            isAuthenticating: false
         });
    });
  }

  render() {
    return (
              <div>
                  {
                      (this.state.authError!= "" && this.state.authError!= null) && 
                      <Alert color="danger" >{this.state.authError}</Alert>
                  }
                { !this.state.isAuthenticating &&<Form>
                  <FormGroup row>
                    <Label for="clientId" sm={2}>Client Id</Label>
                    <Col sm={10}>
                      <Input type="text" name="clientId" id="clientID" placeholder="Client Id" value={this.state.clientId} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="clientSecret" sm={2}>Client Secret</Label>
                    <Col sm={10}>
                      <Input type="text" name="clientSecret" id="clientSecret" placeholder="Client Secret" value={this.state.clientSecret} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="tenantId" sm={2}>Tenant Id</Label>
                    <Col sm={10}>
                      <Input type="text" name="tenantId" id="tenantId" placeholder="Tenant Id" value={this.state.tenantId} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="subscriptionId" sm={2}>Subscription Id</Label>
                    <Col sm={10}>
                      <Input type="text" name="subscriptionId" id="subscriptionId" placeholder="Subscription Id" value={this.state.subscriptionId} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="offerId" sm={2}>Offer Id</Label>
                    <Col sm={10}>
                      <Input type="select" name="offerId" id="offerId"  value={this.state.offerId} onChange={this.handleInputChange}>
                        <option value="MS-AZR-0003P">Pay-As-You-Go</option>
                        <option value="MS-AZR-0059P">Visual Studio Professional subscribers</option>
                        <option value="MS-AZR-0062P">MSDN Platforms subscribers</option>
                        <option value="MS-AZR-0063P">Visual Studio Enterprise subscribers</option>
                        <option value="MS-AZR-0064P">Visual Studio Enterprise (BizSpark) subscribers</option>
                        <option value="MS-AZR-0025P">Action Pack</option>
                        <option value="MS-AZR-0015P">Microsoft Internal</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="granularity" sm={2}>Granularity</Label>
                    <Col sm={10}>
                      <Input type="select" name="granularity" id="granularity"  value={this.state.granularity} onChange={this.handleInputChange}>
                        <option value="Daily">Daily</option>
                        <option value="Hourly">Hourly</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="startDate" sm={2}>Start date</Label>
                    <Col sm={10}>
                      <Input type="text" name="startDate" id="startDate" placeholder="YYYY-MM-DDTHH:mm:ss.sssZ" value={this.state.startDate} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="endDate" sm={2}>End date</Label>
                    <Col sm={10}>
                      <Input type="text" name="endDate" id="endDate" placeholder="YYYY-MM-DDTHH:mm:ss.sssZ" value={this.state.endDate} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Label check>
                      <Input type="checkbox" name="detailed" id="detailed" checked={this.state.detailed} onChange={this.handleInputChange} />{' '}
                      Display details
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="detailed" sm={2}>Free-text filter</Label>
                    <Col sm={10}>
                      <Input type="text" name="filter" id="filter" placeholder="Free-text filter (resource group, tags, etc)" value={this.state.filter} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <Button
                    color="primary"
                    size="large"
                    onClick={this.onAuthenticationClick.bind(this)}
                  >
                    Get consumption costs
                  </Button>
                  <Button
                    color="success"
                    size="large"
                    onClick={this.onDownloadClick.bind(this)}
                  >
                    Download consumption costs
                  </Button>
                </Form>
                }
                {
                    this.state.isAuthenticating && <p>
                        <FaSpinner className="icon-spin" style={{fontSize:30}}/>
                        <span style={{padding:10}}>Processing, please wait...</span>
                        </p>
                }
              </div>
    );
  }
  
}

export default ApiUI;