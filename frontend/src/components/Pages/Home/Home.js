import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import ProductCard from '~/components/ProductCard';
import { getProducts } from '~/actions/productAction';
import Loader from '~/components/layout/Loader';
import MetaData from '../MetaData';
const cx = classNames.bind(styles);
function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    {/* <MetaData title="PRODUCTS -- ECOMMERCE"/> */}
                    <div className={cx('banner')}>
                        <div className={cx('title')}>Welcome to Ecommerce</div>
                        <h1 className={cx('content')}>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button className={cx('scroll-btn')}>
                                Scroll <FontAwesomeIcon icon={faComputerMouse} />
                            </button>
                        </a>
                    </div>
                    <h2 className={cx('home-header')}>Featured Products</h2>
                    <div className={cx('product-container')} id="container">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
