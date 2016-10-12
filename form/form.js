'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleReset = _this.handleReset.bind(_this);
    _this.initializeState = _this.initializeState.bind(_this);
    _this.initializeStateForElement = _this.initializeStateForElement.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = {};
      this.initializeState();
    }
  }, {
    key: 'initializeState',
    value: function initializeState() {
      for (var iteratorVariable = 0; iteratorVariable < this.props.children.length; iteratorVariable++) {
        this.initializeStateForElement(this.props.children[iteratorVariable]);
      }
    }
  }, {
    key: 'initializeStateForElement',
    value: function initializeStateForElement(element0) {
      if (element0.type === 'textarea') {
        if (element0.props.defaultValue) {
          this.setState(_defineProperty({}, element0.props.name, element0.props.defaultValue));
        } else {
          this.setState(_defineProperty({}, element0.props.name, ''));
        }
        return;
      }
      if (element0.type === 'select') {
        if (element0.props.defaultValue) {
          this.setState(_defineProperty({}, element0.props.name, element0.props.defaultValue));
        } else {
          if (element0.props.children[0].props.value) {
            this.setState(_defineProperty({}, element0.props.name, element0.props.children[0].props.value));
          } else {
            this.setState(_defineProperty({}, element0.props.name, ''));
          }
        }
        return;
      }
      var element = element0.props;
      var name = element.name;
      switch (element.type) {
        case 'radio':
          if (element.defaultChecked) {
            this.setState(_defineProperty({}, name, element.value));
          }
          break;
        case 'text':
          if (element.defaultValue) {
            this.setState(_defineProperty({}, name, element.defaultValue));
          } else {
            this.setState(_defineProperty({}, name, ''));
          }
          break;
        case 'checkbox':
          if (element.defaultChecked) {
            this.setState(_defineProperty({}, name, true));
          } else {
            this.setState(_defineProperty({}, name, false));
          }
          break;
        default:
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var element = event.target;
      var name = element.name;
      switch (element.type) {
        case 'checkbox':
          this.setState(_defineProperty({}, name, element.checked));
          break;
        case 'textarea':
        case 'text':
        case 'select-one':
        case 'radio':
          this.setState(_defineProperty({}, name, element.value));
          break;
        case 'select-multiple':
          var options = element.options;
          var value = [];
          for (var iteratorVariable = 0; iteratorVariable < options.length; iteratorVariable++) {
            if (options[iteratorVariable].selected) {
              value.push(options[iteratorVariable].value);
            }
          }
          this.setState(_defineProperty({}, name, value));
          break;
        default:
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.submitHandler(this.state);
    }
  }, {
    key: 'handleReset',
    value: function handleReset(event) {
      event.preventDefault();
      this.initializeState();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit, onChange: this.handleChange, onReset: this.handleReset },
          this.props.children,
          _react2.default.createElement('input', { type: 'reset', value: 'Reset state' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
        )
      );
    }
  }]);

  return Form;
}(_react.Component);

CustomForm.propTypes = {
  children: _react2.default.PropTypes.array.isRequired,
  submitHandler: _react2.default.PropTypes.func
};
exports.default = Form;
