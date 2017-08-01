import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });

    setInterval(() => {
      this.props.getComments().then((comments) => {
        const _comments = comments.data.map((comment) => {
          return Object.assign({}, comment, {
            age: moment(comment.createdAt).fromNow()
          })
        });

        this.setState({
          comments: _comments,
        });
      })
    }, 1000)
  }


  renderComments() {
    const commentsDom = this.state.comments.map(comment => (
      <li key={comment._id}>
        {comment.comment}
        <br/>
        Created at {comment.age}
        <br/>
        Created by {comment.user && comment.user.username}
      </li>
    ));

    return (
      <ul>
        {commentsDom}
      </ul>
    );
  }

  render() {
    if ( !this.state.comments.length ) {
      return false;
    }
    return (
      <div>
        {this.renderComments()}
      </div>
    );
  }
}

Comments.propTypes = {};

export default Comments;
