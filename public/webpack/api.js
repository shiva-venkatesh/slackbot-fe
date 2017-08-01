import Http from './http-adapter';

const Api = {
  saveComment(data) {
    return Http.post('/comments', data);
  },
  getComments() {
    return Http.get('/comments');
  }
};

export default Api;