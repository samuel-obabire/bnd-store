import ReactDOM from 'react-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import { BreakpointProvider } from 'react-socks'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App'
import { store, persistor } from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BreakpointProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BreakpointProvider>
  </Provider>,
  document.getElementById('root')
)
