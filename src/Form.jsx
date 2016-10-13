import React, {Component} from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.initializeStateForElement = this.initializeStateForElement.bind(this);
  }
  componentWillMount() {
    this.state = {};
    this.initializeState();
  }
  initializeState() {
    for (let iteratorVariable = 0; iteratorVariable < this.props.children.length; iteratorVariable++) {
      this.initializeStateForElement(this.props.children[iteratorVariable]);
    }
  }
  initializeStateForElement(element0) {
    if (element0.type === 'textarea') {
      if (element0.props.defaultValue) {
        this.setState({[element0.props.name]: element0.props.defaultValue});
      } else {
        this.setState({[element0.props.name]: ''});
      }
      return;
    }
    if (element0.type === 'select') {
      if (element0.props.defaultValue) {
        this.setState({[element0.props.name]: element0.props.defaultValue});
      } else {
        if (element0.props.children[0].props.value) {
          this.setState({[element0.props.name]: element0.props.children[0].props.value});
        } else {
          this.setState({[element0.props.name]: ''});
        }
      }
      return;
    }
    const element = element0.props;
    const name = element.name;
    switch (element.type) {
      case 'radio':
        if (element.defaultChecked) {
          this.setState({[name]: element.value});
        }
        break;
      case 'text':
      case 'password':
        if (element.defaultValue) {
          this.setState({[name]: element.defaultValue});
        } else {
          this.setState({[name]: ''});
        }
        break;
      case 'checkbox':
        if (element.defaultChecked) {
          this.setState({[name]: true});
        } else {
          this.setState({[name]: false});
        }
        break;
      default:
    }
  }
  handleChange(event) {
    const element = event.target;
    const name = element.name;
    switch (element.type) {
      case 'checkbox':
        this.setState({[name]: element.checked});
        break;
      case 'textarea':
      case 'text':
      case 'password':
      case 'select-one':
      case 'radio':
        this.setState({[name]: element.value});
        break;
      case 'select-multiple':
        const options = element.options;
        const value = [];
        for (let iteratorVariable = 0; iteratorVariable < options.length; iteratorVariable++) {
          if (options[iteratorVariable].selected) {
            value.push(options[iteratorVariable].value);
          }
        }
        this.setState({[name]: value});
        break;
      default:
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.submitHandler(this.state);
  }
  handleReset(event) {
    event.preventDefault();
    this.initializeState();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} onReset={this.handleReset}>
          {this.props.children}
        </form>
      </div>
    );
  }
}
export default Form;
