import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// scroll bar
import 'simplebar/src/simplebar.css';

// apex-chart
import 'assets/third-party/react-table.css';

// project import
import App from './App';
import { store, persister } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
