import { Router, Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './index';

export default (
    <Route path="/user/:id" component={App}/>
)
