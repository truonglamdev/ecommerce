import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Typography } from '@mui/material';
import { Slider } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { getProducts, clearErrors } from '~/actions/productAction';
import ProductCard from '~/components/ProductCard';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);

const categories = ['All', 'Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones'];

function Products() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { products, loading, error, countProducts, resultsPerPage } = useSelector((state) => state.products);
    const keyword = params.keyword;
    // const count = filteredProductsCount;
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const handleSetNewPrice = (e, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));

    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

    return (
        <>
            <h2 className={cx('product-header')}>Products</h2>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('filter-container')}>
                        <div className={cx('filter-price')}>
                            <Typography>Price</Typography>
                            <Slider
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                onChange={handleSetNewPrice}
                                value={price}
                                min={0}
                                max={25000}
                                color="secondary"
                                size="small"
                            />
                        </div>
                        <div className={cx('filter-category')}>
                            <Typography className={cx('title')}>Categories</Typography>
                            <ul className={cx('category-box')}>
                                {categories.map((category) => (
                                    <li
                                        className={cx('category-link')}
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <fieldset className={cx('filter-rating')}>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                                color="secondary"
                                size="small"
                                value={ratings}
                                onChange={(e, newRating) => setRatings(newRating)}
                            />
                        </fieldset>
                    </div>

                    <div className={cx('product-container')}>
                        <div className={cx('product-box')}>
                            {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                        </div>

                        {products.length  && (
                            <div className={cx('pagination-container')}>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultsPerPage}
                                    totalItemsCount={countProducts}
                                    onChange={setCurrentPageNo}
                                    nextPageText={<FontAwesomeIcon icon={faArrowRight} />}
                                    prevPageText={<FontAwesomeIcon icon={faArrowLeft} />}
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                    className="pagination"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Products;
