import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { Provider } from 'react-redux';
import GlobalStyles from '~/components/GlobalStyles';
import store from '~/store';
import AlertProvider from '~/Provider/AlertProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AlertProvider>
            <GlobalStyles>
                {/* <React.StrictMode> */}
                <App />
                {/* </React.StrictMode> */}
            </GlobalStyles>
        </AlertProvider>
    </Provider>,
);
