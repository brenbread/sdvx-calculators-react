import React, { Component } from 'react';
import  { Col, Form, FormGroup, Input, FormFeedback, Table } from 'reactstrap';

class Grade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidInput: 1, //1 = true 0 = false

      maxChain: '',

      near_S: 0,
      error_S: 0,

      near_AAAplus: 0,
      error_AAAplus: 0,

      near_AAA: 0,
      error_AAA: 0,

      near_AAplus: 0,
      error_AAplus: 0,

      near_AA: 0,
      error_AA: 0,

      near_Aplus: 0,
      error_Aplus: 0,

      near_A: 0,
      error_A: 0
    }
    //input handler
    this.handleMaxChain = this.handleMaxChain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //grade calculation
    this.gradeCalc = this.gradeCalc.bind(this);
  }

  handleMaxChain = e => {
    this.setState({ maxChain: e.target.value });
  }

  handleSubmit = e => {
    this.gradeCalc(this.state.maxChain);
    e.preventDefault();
  }

  gradeCalc = (maxChain) => {
    if (maxChain < 0) {
      this.setState({ isValidInput: 0 });
    }

    else {
      this.setState({ isValidInput: 1 });
      var maxScore = 10000000;
      var criticalVal = maxScore/maxChain;
      var nearVal = criticalVal/2;
      var nearOut = 0;
      var errorOut = 0;

      var gradeValue = {
        S: 9900000,
        AAAplus: 9800000,
        AAA: 9700000,
        AAplus: 9500000,
        AA: 9300000,
        Aplus: 9000000,
        A: 8700000
      }

      //S
      nearOut = Math.floor((maxScore - gradeValue.S)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_S: nearOut });
      this.setState({ error_S: errorOut });

      //AAA+
      nearOut = Math.floor((maxScore - gradeValue.AAAplus)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_AAAplus: nearOut });
      this.setState({ error_AAAplus: errorOut });

      //AAA
      nearOut = Math.floor((maxScore - gradeValue.AAA)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_AAA: nearOut });
      this.setState({ error_AAA: errorOut });

      //AA+
      nearOut = Math.floor((maxScore - gradeValue.AAplus)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_AAplus: nearOut });
      this.setState({ error_AAplus: errorOut });

      //AA
      nearOut = Math.floor((maxScore - gradeValue.AA)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_AA: nearOut });
      this.setState({ error_AA: errorOut });

      //A+
      nearOut = Math.floor((maxScore - gradeValue.Aplus)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_Aplus: nearOut });
      this.setState({ error_Aplus: errorOut });

      //A
      nearOut = Math.floor((maxScore - gradeValue.A)/nearVal);
      errorOut = Math.floor(nearOut/2);
      this.setState({ near_A: nearOut });
      this.setState({ error_A: errorOut });
    }
  }

  render() {
    let isValidInput = this.state.isValidInput;
  return(
    <div className="grade-calc">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <center>
        <h3>Grade Calculator</h3>
        <p>Input max chain of chart. This assumes max nears or errors for a certain grade.</p>
      <Form>
        <FormGroup>
          {isValidInput === 0 &&
            <div className="invalid-input">
              <Input
                type="number"
                onChange={this.handleMaxChain}
                value={this.state.maxChain}
                placeholder="Max Chain"
                invalid />
              <FormFeedback>Can't have negative max chain</FormFeedback>
            </div>
          }
          {isValidInput === 1 &&
            <div className="valid-input">
              <Input
                type="number"
                onChange={this.handleMaxChain}
                value={this.state.maxChain}
                placeholder="Max Chain"
                onSubmit={this.handleSubmit}
              />
            </div>
          }
        </FormGroup>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Max Nears</th>
            <th>Max Errors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>{this.state.near_S}</td>
            <td>{this.state.error_S}</td>
          </tr>
          <tr>
            <td>AAA+</td>
            <td>{this.state.near_AAAplus}</td>
            <td>{this.state.error_AAAplus}</td>
          </tr>
          <tr>
            <td>AAA</td>
            <td>{this.state.near_AAA}</td>
            <td>{this.state.error_AAA}</td>
          </tr>
          <tr>
            <td>AA+</td>
            <td>{this.state.near_AAplus}</td>
            <td>{this.state.error_AAplus}</td>
          </tr>
          <tr>
            <td>AA</td>
            <td>{this.state.near_AA}</td>
            <td>{this.state.error_AA}</td>
          </tr>
          <tr>
            <td>A+</td>
            <td>{this.state.near_Aplus}</td>
            <td>{this.state.error_Aplus}</td>
          </tr>
          <tr>
            <td>A</td>
            <td>{this.state.near_A}</td>
            <td>{this.state.error_A}</td>
          </tr>
        </tbody>
      </Table>
      <button onClick={this.handleSubmit} className="btn btn-primary">Calculate</button>
      </center>
    </Col>
    </div>
  )}
}

export default Grade;
