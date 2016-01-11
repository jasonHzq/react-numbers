import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import ReactNumbers from 'react-numbers';

class App extends Component {
  state = {
    isAnimationBegin: false,
    num: 22322332,
    none: false,
  }

  handleBtnClick() {
    this.setState({
      isAnimationBegin: !this.setState.isAnimationBegin
    });
  }

  handleChangeInput(e) {
    this.setState({
      num: parseInt(e.target.value, 10)
    });
  }

  render() {
    return (
      <div className="app">
        <button className="btn" onClick={::this.handleBtnClick}>click me!</button>
        <input type="text" onBlur={::this.handleChangeInput} placeholder='change num' />
        <ReactNumbers num={this.state.num} initialNum={10032} duration={5000} isEnable={this.state.isAnimationBegin}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

