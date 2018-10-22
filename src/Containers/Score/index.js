import React, { Component } from 'react';
import  { Alert, Col, InputGroup, Input, Table } from 'reactstrap';

class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubtractive: 1, //pick between calculation modes
      isValidInput: 1,
      isValidSubtractiveInput: 1,

      maxChain: 0,
      critical: 0,
      near: 0,
      error: 0,
      calculatedScore: 0,
      critVal: 0,
      nearVal: 0,
      grade: 'D'
    }

    //input handlers
    this.handleChange = this.handleChange.bind(this);

    //score calculation
    this.scoreCalc = this.scoreCalc.bind(this);
    this.critVal = this.critVal.bind(this);
    this.nearVal = this.nearVal.bind(this);
    this.gradeCheck = this.gradeCheck.bind(this);

    //handle calc type
    this.toggleCalcType = this.toggleCalcType.bind(this);

    //submission handler
    this.handleSubmit = this.handleSubmit.bind(this);

    //clear form
    this.clearState = this.clearState.bind(this);
  }

  //input handlers
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  //score calculation
  scoreCalc(e) {
    let calculatedScore = 0;
    let maxChain = 0;
    let critical = 0;
    let near = 0;
    let error = 0;

    //invalid input handlers
    if(this.state.maxChain <= 0 || this.state.critical < 0 || this.state.near < 0 || this.state.error < 0) {
      this.setState({ isValidInput: 0 });
      this.setState({
        calculatedScore: 0,
        maxChain: 0,
        critical: 0,
        near: 0,
        error: 0,
        grade: 'D',
        critVal: 0,
        nearVal: 0
      });
    }

    //valid input
    else {
      this.setState({ isValidInput: 1 });

      //subtractive calculation
      if (this.state.isSubtractive === 1) {
         maxChain = Number(this.state.maxChain);
         critical = Number(this.state.maxChain) - Number(this.state.near) - Number(this.state.error);
         near = Number(this.state.near);
         error = Number(this.state.error);
         this.setState({ critical: critical });

         //handle invalid input maxChain < near + error
         if (maxChain < (near + error)) {
           this.setState({ isValidSubtractiveInput: 0 });
           this.setState({
             calculatedScore: 0,
             maxChain: 0,
             critical: 0,
             near: 0,
             error: 0,
             grade: 'D',
             critVal: 0,
             nearVal: 0
           });
         }

         else {
           this.setState({ isValidSubtractiveInput: 1 });
           calculatedScore = Math.floor(((critical+(near/2))/maxChain)*10000000);
           this.gradeCheck(calculatedScore);
           this.setState({ calculatedScore: calculatedScore });
           this.critVal(e);
           this.nearVal(e);
         }
      }

      //classic calculation
      else if (this.state.isSubtractive === 0) {
         maxChain = Number(this.state.critical) + Number(this.state.near) + Number(this.state.error);
         critical = Number(this.state.critical);
         near = Number(this.state.near);
         error = Number(this.state.error);
         this.setState({ maxChain: maxChain })

         calculatedScore = Math.floor(((critical+(near/2))/maxChain)*10000000);
         this.gradeCheck(calculatedScore);
         this.critVal(e);
         this.nearVal(e);
         this.setState({ calculatedScore: calculatedScore });
      }
    }
    e.preventDefault();
  }

  critVal(e) {
    let critical = Math.floor(10000000/Number(this.state.maxChain));
    this.setState({ critVal: critical });
  }

  nearVal(e) {
    let near = Math.floor((10000000/Number(this.state.maxChain))/2);
    this.setState({ nearVal: near });
  }

  gradeCheck(calculatedScore) {
    var grades = {
      S: 9900000,
      AAAplus: 9800000,
      AAA: 9700000,
      AAplus: 9500000,
      AA: 9300000,
      Aplus: 9000000,
      A: 8700000,
      B: 7500000,
      C: 6500000,
    }

    switch(true) {
      case(calculatedScore >= grades.S):
        this.setState({ grade: 'S' });
        break;

      case(calculatedScore >= grades.AAAplus && calculatedScore <= grades.S):
        this.setState({ grade: 'AAA+' });
        break;

      case(calculatedScore >= grades.AAA && calculatedScore <= grades.AAAplus):
        this.setState({ grade: 'AAA' });
        break;

      case(calculatedScore >= grades.AAplus && calculatedScore <= grades.AAA):
        this.setState({ grade: 'AA+' });
        break;

      case(calculatedScore >= grades.AA && calculatedScore <= grades.AAplus):
        this.setState({ grade: 'AA' });
        break;

      case(calculatedScore >= grades.Aplus && calculatedScore <= grades.AA):
        this.setState({ grade: 'A+' });
        break;

      case(calculatedScore >= grades.A && calculatedScore <= grades.Aplus):
        this.setState({ grade: 'A' });
        break;

      case(calculatedScore >= grades.B && calculatedScore <= grades.A):
        this.setState({ grade: 'B' });
        break;

      case(calculatedScore >= grades.C && calculatedScore <= grades.B):
        this.setState({ grade: 'C' });
        break;

      default:
        this.setState({ grade: 'D' })
        break;
    }
  }

  //calculation type toggle
  toggleCalcType() {
    this.setState({
      isValidInput: 1,
      isValidSubtractiveInput: 1
    });
    if (this.state.isSubtractive === 0) {
      this.setState({ isSubtractive: 1 });
    }

    else if (this.state.isSubtractive === 1) {
      this.setState({ isSubtractive: 0 });
    }
  }

  //submission handler
  handleSubmit(e) {
    this.setState({ isValidInput: 1 });
    this.scoreCalc(e);
  }

  //clear function
  clearState(e) {
    this.setState({
      maxChain: 0,
      critical: 0,
      near: 0,
      error: 0,
      calculatedScore: 0,
      critVal: 0,
      nearVal: 0,
      grade: 'D'
    });
  }

  render() {
    let isValidInput = this.state.isValidInput;
    let isValidSubtractiveInput = this.state.isValidSubtractiveInput;
    let isSubtractive = this.state.isSubtractive;
  return(
    <div className="score-form">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <center><h3>Score Calculator</h3></center>
      {
        isValidInput === 0 && <>
        <Alert color="warning">
          Can't have negative inputs
      </Alert>
        </>
      }
      {
        isValidSubtractiveInput === 0 && <>
        <Alert color="warning">
          Can't have the sum of near and error be greater than max chain
      </Alert>
        </>
      }
      {
        isSubtractive === 1 && <>
          <InputGroup>
            <Input
              type="number"
              placeholder="Max Chain"
              name="maxChain"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              name="near"
              placeholder="Near (Subtractive)"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              name="error"
              placeholder="Error (Subtractive)"
              onChange={this.handleChange}
            />
          </InputGroup>
        </>
      }
      {
        isSubtractive === 0 && <>
          <InputGroup>
            <Input
              type="number"
              placeholder="Critical"
              name="critical"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              placeholder="Near"
              name="near"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              placeholder="Error"
              name="error"
              onChange={this.handleChange}
            />
          </InputGroup>
        </>
      }
      <div className="score-output">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td><b>Score</b></td>
              <td>{this.state.calculatedScore}</td>
            </tr>
            <tr>
              <td>Max Chain</td>
              <td>{this.state.maxChain}</td>
            </tr>
            <tr>
              <td>Critical</td>
              <td>{this.state.critical}</td>
            </tr>
            <tr>
              <td>Near</td>
              <td>{this.state.near}</td>
            </tr>
            <tr>
              <td>Error</td>
              <td>{this.state.error}</td>
            </tr>
            <tr>
              <td>Grade</td>
              <td>{this.state.grade}</td>
            </tr>
            <tr>
              <td>Critical value</td>
              <td>{this.state.critVal}</td>
            </tr>
            <tr>
              <td>Near value</td>
              <td>{this.state.nearVal}</td>
            </tr>
          </tbody>
        </Table>
        <center>
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-primary">Calculate</button>
          &nbsp;
          {
            isSubtractive === 1 &&
              <button onClick={this.toggleCalcType} className="btn btn-info">Subtractive</button>

          }
          {
            isSubtractive === 0 &&
              <button onClick={this.toggleCalcType} className="btn btn-secondary">Classic</button>
          }
        </form>
        </center>
      </div>
      </Col>
    </div>
  )}
}

export default Score;
