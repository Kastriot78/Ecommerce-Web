import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
// import { store, persistor } from './redux/store';
import store from './redux/store';

import 'react-slideshow-image/dist/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import './general-style.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

