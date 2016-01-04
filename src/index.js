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

    //第一次开始数值
    initialNum: PropTypes.number,

    //动画持续时间
    duration: PropTypes.number,

    //一帧多少毫秒
    frameTime: PropTypes.number,

    //动画是否开始,若一开始为true，则在组件加载完后绘制动画；否则在改成TRUE时绘制动画
    isEnable: PropTypes.bool,

    //动画结束回调
    onAnimationEnd: PropTypes.func,
  }

  static defaultProps = {
    num: 10000,
    initialNum: 0,
    duration: 1000,
    frameTime: 37,
    isEnable: true,
    onAnimationEnd: () => {}
  }

  state = {
    currNum: parseInt(this.props.initialNum, 10),
  }

  update() {
    const {frameTime} = this.props;
    const {currNum} = this.state;
    const num = this.num;

    if(currNum === num) {
      caf(this.update);

      return;
    }

    if(Date.now() - this.prevTime > frameTime) {
      let nextNum = currNum + this.velocity;

      if(nextNum > num) {
        nextNum = num;
        this.props.onAnimationEnd();
      }

      this.setState({
        currNum: nextNum
      });
      this.prevTime = Date.now();
    }

    raf(this.update.bind(this));
  }

  calVelocity(num) {
    const {currNum} = this.state;
    const {duration, frameTime} = this.props;
    num = parseInt10(num || this.props.num);

    this.num = num;
    this.velocity = parseInt10((num - currNum) / (duration/frameTime));
  }

  componentWillMount() {
    this.calVelocity();
  }

  componentDidMount() {
    if(this.props.isEnable) {
      this.prevTime = Date.now();
      this.update();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.isEnable && nextProps.isEnable) {
      this.prevTime = Date.now();
      this.update();
    }
    if(nextProps.num !== this.props.num) {
      this.calVelocity(nextProps.num);
      this.prevTime = Date.now();
      this.update();
    }
  }

  render() {
    const {num, isEnable} = this.props;
    const {currNum} = this.state;
    const velocity = this.velocity;
    const renderedNum = currNum === num ? num :
      isEnable ? parseInt10(currNum/velocity)*velocity + parseInt10(Math.random()*velocity) : currNum;

    return (
      <div className="animated-number">
        {renderedNum}
      </div>
    );
  }
}

export default ReactNumbers;
