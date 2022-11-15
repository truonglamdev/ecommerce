import { transitions, positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

function AlertProvider({ children }) {
    const options = {
        position: positions.BOTTOM_CENTER,
        timeout: 5000,
        offset: '30px',
        transition: transitions.SCALE,
    };
    return (
        <Provider template={AlertTemplate} {...options}>
            {children}
        </Provider>
    );
}

export default AlertProvider;
