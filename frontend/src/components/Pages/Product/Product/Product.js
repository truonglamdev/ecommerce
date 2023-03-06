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
        <div className={cx('wrapper')}>
            <div className={cx('filter-container')}>
                <div className={cx('filter-box')}>
                    <div className={cx('filter-price')}>
                        <div className={cx('title')}>Price</div>
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
                        <div className={cx('title')}>Categories</div>

                        {window.innerWidth <= 1023 ? (
                            <select className={cx('select-catalog')} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((category) => (
                                    <option className={cx('category-link')} key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        ) : (
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
                        )}
                    </div>

                    <fieldset className={cx('filter-rating')}>
                        <Typography className={cx('title')} component="legend">
                            Ratings Above
                        </Typography>
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
            </div>

            <div className={cx('product-container')}>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className={cx('big-title')}>PRODUCTS</div>
                        <div className={cx('product-box')}>
                            {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                        </div>
                        {products.length && (
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
                )}
            </div>
        </div>
    );
}

export default Products;
