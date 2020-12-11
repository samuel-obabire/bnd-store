import ReactDOM from 'react-dom';
import 'normalize.css';
import { Provider } from 'react-redux';
import { BreakpointProvider } from 'react-socks';

import App from './components/App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BreakpointProvider>
      <App />
    </BreakpointProvider>
  </Provider>,
  document.getElementById('root')
);
