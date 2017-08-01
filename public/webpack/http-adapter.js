class HttpAdapter {
  constructor(args = {}) {
    this.baseURL = args.baseURL || `${ window.location.protocol }//${ window.location.host }`;
    this.backend = args.backend || fetch;
    this.namespace = args.namespace || '';
    this.apiKey = args.apiKey || null;
  }

  get(url, data) {
    return this.request('GET', url, data);
  }

  post(url, data) {
    return this.request('POST', url, data);
  }

  patch(url, data) {
    return this.request('PATCH', url, data);
  }

  put(url, data) {
    return this.request('PUT', url, data);
  }

  delete(url, data = null) {
    return this.request('DELETE', url, data);
  }

  get defaultHeaders() {
    return Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, this.apiKey ? { Authorization: `Bearer ${ this.apiKey }` } : {});
  }

  request(method, url, data) {
    const request = new Request(this.baseURL + this.namespace + url, {
      method,
      headers: this.defaultHeaders,
      // Set body if method is POST, PUT, PATCH, not applicable for GET, DELETE
      body: ['POST', 'PUT', 'PATCH'].indexOf(method) > -1 ? JSON.stringify(data) : null
    });

    return new Promise((resolve, reject) => {
      this.backend.call(window, request).then((response) => {
        this._parseResponse(response).then((json) => {
          return response.ok ? resolve(json) : reject(json);
        });
      }).catch((err) => reject(err));
    });
  }

  _parseResponse(response) {
    let responseHeaders = {};

    for (let [ key, value ] of response.headers.entries()) {
      responseHeaders[key] = value;
    }

    let responsePayload = {
      code: response.status,
      status: response.statusText,
      headers: responseHeaders
    };

    return response.text().then((text) => {
      let parseFail = false;
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        parseFail = true;
      } finally {
        responsePayload.data = parseFail ? null : json;
        return responsePayload;
      }
    });
  }
}

const http = new HttpAdapter({
  baseURL: 'http://localhost:4205/'
});

export default http;
