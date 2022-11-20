import { BrowserRouter as Router } from 'react-router-dom';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import Content from '~/components/layout/Content/Content';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Content />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
