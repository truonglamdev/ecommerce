import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import Content from '~/components/layout/Content/Content';
import UserOptions from './components/layout/Header/UserOptions';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

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
