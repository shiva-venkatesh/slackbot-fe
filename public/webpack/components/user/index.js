import React, { Component, PropTypes } from 'react';
import Form from '../form';


class User extends Component {
  render() {
    return (
      <div>{this.props.params.id}
        <Form/>
      </div>

    );
  }
}

export default User;
