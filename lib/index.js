'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Project react numbers
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zongquan.hzq
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description react numbers with animation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var parseInt10 = function parseInt10(num) {
  return parseInt(num, 10);
};

var ReactNumbers = function (_Component) {
  _inherits(ReactNumbers, _Component);

  function ReactNumbers() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactNumbers);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactNumbers)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      currNum: _this.props.isEnable ? _this.props.num : parseInt(_this.props.initialNum, 10)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactNumbers, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.calVelocity();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isEnable) {
        this.prevTime = Date.now();
        this.update();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.num !== this.props.num) {
        this.calVelocity(nextProps.num);
        this.prevTime = Date.now();
        this.update();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _raf.cancel)(this.cafId);
    }
  }, {
    key: 'calVelocity',
    value: function calVelocity(num) {
      var currNum = this.state.currNum;
      var _props = this.props;
      var duration = _props.duration;
      var frameTime = _props.frameTime;

      var parsedNum = parseInt10(num || this.props.num);

      this.num = parsedNum;
      this.velocity = parseInt10((parsedNum - currNum) / duration * frameTime);
    }
  }, {
    key: 'update',
    value: function update() {
      var frameTime = this.props.frameTime;
      var currNum = this.state.currNum;

      var num = this.num;

      if (currNum === num) {
        (0, _raf.cancel)(this.cafId);

        return;
      }

      if (Date.now() - this.prevTime > frameTime) {
        var nextNum = currNum + this.velocity;

        if (nextNum > num) {
          nextNum = num;
          this.props.onAnimationEnd();
        }

        this.setState({
          currNum: nextNum
        });
        this.prevTime = Date.now();
      }

      this.cafId = (0, _raf2.default)(this.update.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var num = _props2.num;
      var isEnable = _props2.isEnable;
      var className = _props2.className;

      var other = _objectWithoutProperties(_props2, ['num', 'isEnable', 'className']);

      var currNum = this.state.currNum;

      var velocity = this.velocity;
      var renderedNum = num;

      if (currNum !== num) {
        if (isEnable) {
          renderedNum = parseInt10(currNum / velocity) * velocity + parseInt10(Math.random() * velocity);
        } else {
          renderedNum = currNum;
        }
      }

      var CX = className ? 'animation-number ' + className : 'animation-number';

      return _react2.default.createElement(
        'div',
        _extends({ className: CX }, other),
        renderedNum
      );
    }
  }]);

  return ReactNumbers;
}(_react.Component);

ReactNumbers.propTypes = {
  // 结束数值，最终数值
  num: _react.PropTypes.number,

  // 第一次开始数值
  initialNum: _react.PropTypes.number,

  // 动画持续时间
  duration: _react.PropTypes.number,

  // 一帧多少毫秒
  frameTime: _react.PropTypes.number,

  // 动画是否开始,若一开始为true，则在组件加载完后绘制动画；否则在改成TRUE时绘制动画
  isEnable: _react.PropTypes.bool,

  // 动画结束回调
  onAnimationEnd: _react.PropTypes.func,

  // className
  className: _react.PropTypes.string
};
ReactNumbers.defaultProps = {
  num: 10000,
  initialNum: 0,
  duration: 1000,
  frameTime: 37,
  isEnable: true,
  onAnimationEnd: function onAnimationEnd() {}
};
exports.default = ReactNumbers;