import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/css-spaces/dist/spaces.min.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
