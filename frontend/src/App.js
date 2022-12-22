import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import Content from '~/components/layout/Content/Content';
import UserOptions from './components/layout/Header/UserOptions';
import { loadUser } from '~/actions/userAction';
import store from '~/store';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        store.dispatch(loadUser());
    }, []);
    
    return (
        <div className="App">
            <Router>
                <Header />
                {isAuthenticated && <UserOptions user={user} />}
                <Content />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
