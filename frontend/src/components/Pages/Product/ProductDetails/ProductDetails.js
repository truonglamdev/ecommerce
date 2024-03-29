import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import ReviewCard from '~/components/ReviewCard';
import Loader from '~/components/layout/Loader';
import { clearErrors, getDetailProduct, newReview, resetReview } from '~/actions/productAction';
import { addItemsToCart } from '~/actions/cartAction';
import { useAlert } from 'react-alert';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Rating } from '@mui/material';

const cx = classNames.bind(styles);
function ProductDetails() {
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError, loading: reviewLoading } = useSelector((state) => state.newReview);
    const options = {
        readOnly: true,
        precision: 0.5,
        size: 'small',
    };

    const buttonStyle = {
        width: '28px',
        height: '28px',
        padding: '6px',
        background: '#ccc',
        border: '0px',
        borderRadius: '50%',
    };

    const properties = {
        prevArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
                </svg>
            </button>
        ),
    };

    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

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

    const handleSubmitReview = () => {
        const myForm = new FormData();

        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', params.id);
        dispatch(newReview(myForm));
        setOpen(false);
    };

    const handleOpenToggle = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Review Submitted Successfully');
            dispatch(resetReview());
        }
        dispatch(getDetailProduct(params.id));
    }, [dispatch, params, error, alert, reviewError, success]);

    return (
        <>
            {loading && reviewLoading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('slide-box')}>
                            <div className={cx('product-slide')}>
                                <Slide {...properties} pauseOnHover={true} duration={3000} transitionDuration={2000}>
                                    {product &&
                                        product.images &&
                                        product.images.map((image, index) => (
                                            <img
                                                className={cx('slide-image')}
                                                key={index}
                                                src={image.url}
                                                alt={`${index} slide`}
                                            />
                                        ))}
                                </Slide>

                                <div className={cx('preview-image')}>
                                    {product.images &&
                                        product.images.map((image, index) => (
                                            <img
                                                className={cx('image')}
                                                key={index}
                                                src={image.url}
                                                alt={`${index} img`}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-box')}>
                            <div className={cx('product-name')}>
                                <span className={cx('name')}>{product.name}</span>
                                <span className={cx('product-id')}> Product #{product._id}</span>
                            </div>
                            <div className={cx('product-rating')}>
                                <div>
                                    <Rating {...options } value={product ? product.ratings : 0} />
                                </div>
                                <span className={cx('quantity-reviews')}>
                                    (<span>{product.numOfReviews}</span> Reviews)
                                </span>
                            </div>
                            <div className={cx('product-info')}>
                                <span className={cx('product-price')}>Price : ${product.price}</span>
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
                                        disabled={product.Stock < 1 ? true : false}
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

                            <button className={cx('submit-review', 'primary-btn')} onClick={handleOpenToggle}>
                                Submit review
                            </button>
                        </div>
                    </div>

                    <h2 className={cx('heading-review')}>Reviews</h2>

                    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleOpenToggle}>
                        <DialogTitle className={cx('review-title')}>Submit Review Product</DialogTitle>
                        <DialogContent className={cx('review-content')}>
                            <Rating
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                size={window.innerWidth > 600 ? 'large' : 'small'}
                            />
                            <textarea
                                className={cx('review-text')}
                                cols={window.innerWidth > 600 ? 60 : 30}
                                rows="6"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions className={cx('review-action')}>
                            <Button
                                onClick={handleOpenToggle}
                                color="secondary"
                                variant="outlined"
                                size={window.innerWidth > 600 ? 'medium' : 'small'}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitReview}
                                color="primary"
                                variant="outlined"
                                size={window.innerWidth > 600 ? 'medium' : 'small'}
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className={cx('reviews-container')}>
                        {product.reviews && product.reviews[0] ? (
                            product.reviews.map((review, index) => <ReviewCard data={review} key={index} />)
                        ) : (
                            <div className={cx('no-review')}>No reviews &#128546;</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetails;
