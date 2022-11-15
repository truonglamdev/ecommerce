import { useEffect } from 'react';
import WebFont from 'webfontloader';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
    }, []);
    return children;
}

export default GlobalStyles;
