import { useEffect } from 'react';
import WebFont from 'webfontloader';
import './GlobalStyles.scss';
import { loadUser } from '~/actions/userAction';
import store from '~/store';

function GlobalStyles({ children }) {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        store.dispatch(loadUser());
    }, []);
    
    return children;
}

export default GlobalStyles;
