import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';

import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import ReviewCard from '~/components/ReviewCard';
import Loader from '~/components/layout/Loader';
import { clearErrors, getDetailProduct } from '~/actions/productAction';
import { addItemsToCart } from '~/actions/cartAction';
import { useAlert } from 'react-alert';

const cx = classNames.bind(styles);
function ProductDetails() {
    const options = {
        value: 4,
        activeColor: '#eb4034',
        readOnly: true,
        precision: 0.5,
        size: window.innerWidth > 600 ? 20 : 16,
    };

    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const { product, loading, error } = useSelector((state) => state.productDetails);

    const handleIncreaseQuantity = () => {
        if (product.Stock <= quantity) return;
        setQuantity((prev) => prev + 1);
    };
    const handleDecreaseQuantity = () => {
        if (1 >= quantity) return;
        setQuantity((prev) => prev - 1);
    };

    const handleAddProductToCart = () => {
        const productId = params.id;
        dispatch(addItemsToCart(productId, quantity));
        alert.success('Items added successfully');
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getDetailProduct(params.id));
    }, [dispatch, params, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('slide-box')}>
                            <div className={cx('product-slide')}>
                                <Carousel>
                                    {product.images &&
                                        product.images.map((image, index) => (
                                            <img
                                                className={cx('slide-image')}
                                                key={index}
                                                src={image.url}
                                                alt={`${index} Slide`}
                                            />
                                        ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className={cx('product-box')}>
                            <div className={cx('product-name')}>
                                <span className={cx('name')}>{product.name}</span>
                                <span className={cx('product-id')}> Product #{product._id}</span>
                            </div>
                            <div className={cx('product-rating')}>
                                <div>
                                    <ReactStars {...options} />
                                </div>
                                <span className={cx('quantity-reviews')}>
                                    (<span>{product.numOfReviews}</span> Reviews)
                                </span>
                            </div>
                            <div className={cx('product-info')}>
                                <span className={cx('product-price')}>${product.price}</span>
                                <div className={cx('product-status')}>
                                    <div className={cx('product-quantity')}>
                                        <button className={cx('quantity-btn')} onClick={handleDecreaseQuantity}>
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className={cx('quantity-input')}
                                            value={quantity}
                                            readOnly
                                        />
                                        <button className={cx('quantity-btn')} onClick={handleIncreaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className={cx('add-to-cart-btn', 'primary-btn')}
                                        onClick={handleAddProductToCart}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                                <span className={cx('product-stock')}>
                                    Status :<span>InStock</span>
                                </span>
                            </div>

                            <div className={cx('description')}>
                                Description : <p>{product.description}</p>
                            </div>

                            <button className={cx('submit-review', 'primary-btn')}>Submit review</button>
                        </div>
                    </div>

                    <h2 className={cx('heading-review')}>Reviews</h2>
                    <div className={cx('reviews-container')}>
                        {product.reviews && product.reviews ? (
                            product.reviews.map((review, index) => <ReviewCard data={review} key={index} />)
                        ) : (
                            <div className={cx('no-review')}>No review</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
