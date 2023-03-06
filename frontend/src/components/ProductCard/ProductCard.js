import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { addItemsToCart } from '~/actions/cartAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);
function ProductCard({ product }) {
    const dispatch = useDispatch();
    const alert = useAlert();
    const heartRef = useRef();
    const [liked, setLiked] = useState(false);
    const options = {
        value: product.ratings,
        activeColor: '#eb4034',
        readOnly: true,
        precision: 0.5,
        size: 20,
    };

    const handleAddToCart = (id) => {
        alert.success('Add product to cart successfully !!');
        dispatch(addItemsToCart(id, 1));
    };

    const handleLike = () => {
        const heartClassName = heartRef.current.className;
        setLiked(() => (heartClassName.includes('active') ? false : true));
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Link Link to={`/product/${product._id}`} className={cx('product-image')}>
                    <img src={product && product.images ? product.images[0].url : ''} alt="" className={cx('image')} />
                </Link>
                <div className={cx('product-details')}>
                    <div className={cx('product-info')}>
                        <p className={cx('product-name')}>{product.name}</p>
                        <span className={cx('product-price')}>${product.price}</span>
                    </div>
                    <div className={cx('description')}>{product.description}</div>
                    <div className={cx('review')}>
                        <div>
                            <ReactStars {...options} />
                        </div>
                        <span className={cx('quantity-reviews')}>
                            (<span>{product.numOfReviews}</span> Reviews)
                        </span>
                    </div>
                    <button className={cx('add-btn')} onClick={() => handleAddToCart(product._id)}>
                        Add to cart <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </div>
                <div ref={heartRef} className={cx('heart' , liked ? 'active' : '')} onClick={handleLike}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        </>
    );
}

export default ProductCard;
