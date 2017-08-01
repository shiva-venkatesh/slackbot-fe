import React, { Component, PropTypes } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      comment: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.comment)
  }

  render() {
    return (
      <div>
        <label
          htmlFor="comment"
        >
          Comment
        </label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={this.state.comment}
          onChange={this.handleChange}
        />

        <button type="button" onClick={this.handleSubmit}>Post</button>
      </div>
    );
  }
}

Form.propTypes = {};

export default Form;
