import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import 'normalize.css';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
