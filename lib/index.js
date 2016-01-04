'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Project ..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author zongquan.hzq
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description react numbers with animation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var parseInt10 = function parseInt10(num) {
  return parseInt(num, 10);
};

var ReactNumbers = (function (_Component) {
  _inherits(ReactNumbers, _Component);

  function ReactNumbers() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactNumbers);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactNumbers)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      currNum: parseInt(_this.props.begin, 10)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactNumbers, [{
    key: 'update',
    value: function update() {
      var _props = this.props;
      var frameTime = _props.frameTime;
      var num = _props.num;
      var currNum = this.state.currNum;

      if (currNum === parseInt(this.props.num, 10)) {
        (0, _raf.cancel)(this.update);

        return;
      }

      if (Date.now() - this.prevTime > frameTime) {
        var nextNum = currNum + this.velocity;

        this.setState({
          currNum: nextNum > num ? num : nextNum
        });
        this.prevTime = Date.now();
      }

      (0, _raf2.default)(this.update.bind(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var duration = _props2.duration;
      var num = _props2.num;
      var begin = _props2.begin;
      var frameTime = _props2.frameTime;

      this.velocity = parseInt10((num - begin) / (duration / frameTime));
      this.prevTime = Date.now();
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      var num = this.props.num;
      var currNum = this.state.currNum;

      var velocity = this.velocity || 1;
      var renderedNum = currNum === num ? num : parseInt10(currNum / velocity) * velocity + parseInt10(Math.random() * velocity);

      return _react2.default.createElement(
        'div',
        { className: 'animated-number' },
        renderedNum
      );
    }
  }]);

  return ReactNumbers;
})(_react.Component);

ReactNumbers.propTypes = {
  //结束数值，最终数值
  num: _react.PropTypes.number,
  //开始数值
  begin: _react.PropTypes.number,
  //动画持续时间
  duration: _react.PropTypes.number,
  //一帧多少毫秒
  frameTime: _react.PropTypes.number,
  //动画结束回调
  onAnimationEnd: _react.PropTypes.func
};
ReactNumbers.defaultProps = {
  num: 10000,
  begin: 0,
  duration: 1000,
  frameTime: 37,
  onAnimationEnd: function onAnimationEnd() {}
};
exports.default = ReactNumbers;