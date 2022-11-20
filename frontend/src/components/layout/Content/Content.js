import { Routes, Route } from 'react-router-dom';
import Home from '~/components/Pages/Home';
import Products from '~/components/Pages/Product/Product';
import ProductDetails from '~/components/Pages/Product/ProductDetails';
import Search from '~/components/Pages/Search';
import LoginSignUp from '~/components/User/LoginSignUp';
function Content() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />

            <Route path='/login' element={<LoginSignUp/>}/>
        </Routes>
    );
}

export default Content;
