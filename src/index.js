/*
 * @Project ..
 * @author zongquan.hzq
 * @description react numbers with animation
 */

import React, {Component, PropTypes} from 'react';
import raf, {cancel as caf} from 'raf';

const parseInt10 = num => parseInt(num, 10);

class ReactNumbers extends Component {
  static propTypes = {
    //结束数值，最终数值
    num: PropTypes.number,
    //开始数值
    begin: PropTypes.number,
    //动画持续时间
    duration: PropTypes.number,
    //一帧多少毫秒
    frameTime: PropTypes.number,
    //动画结束回调
    onAnimationEnd: PropTypes.func,
  }

  static defaultProps = {
    num: 10000,
    begin: 0,
    duration: 1000,
    frameTime: 37,
    onAnimationEnd: () => {}
  }

  state = {
    currNum: parseInt(this.props.begin, 10),
  }

  update() {
    const {frameTime, num} = this.props;
    const {currNum} = this.state;

    if(currNum === parseInt(this.props.num, 10)) {
      caf(this.update);

      return;
    }

    if(Date.now() - this.prevTime > frameTime) {
      const nextNum = currNum + this.velocity;

      this.setState({
        currNum: nextNum > num ? num : nextNum
      });
      this.prevTime = Date.now();
    }

    raf(this.update.bind(this));
  }

  componentDidMount() {
    const {duration, num, begin, frameTime} = this.props;
    this.velocity = parseInt10((num - begin) / (duration/frameTime));
    this.prevTime = Date.now();
    this.update();
  }

  render() {
    const {num} = this.props;
    const {currNum} = this.state;
    const velocity = this.velocity;
    const renderedNum = currNum === num ? num :
      parseInt10(currNum/velocity)*velocity + parseInt10(Math.random()*velocity);

    return (
      <div className="animated-number">
        {renderedNum}
      </div>
    );
  }
}

export default ReactNumbers;
