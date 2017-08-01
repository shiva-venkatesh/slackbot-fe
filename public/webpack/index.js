import React, { Component, PropTypes } from 'react';
import Form from './components/form';
import Comments from './components/comments';
import Api from './api'
class App extends Component {
  constructor() {
    super();
    this.saveComment = this.saveComment.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  saveComment(comment) {
    Api.saveComment({
      comment,
      username: this.props.params.id
    })
  }

  getComments() {
    return Api.getComments();
  }

  render() {
    console.log(this.props.params.id);
    return (
      <div>
        <Form
          onSubmit={this.saveComment}
        />
        <Comments getComments={this.getComments} />
      </div>
    );
  }
}


export default App;
