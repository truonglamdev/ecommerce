import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);
function ProductCard({ product }) {
    const options = {
        value: product.ratings,
        activeColor: '#eb4034',
        readOnly: true,
        precision: 0.5,
        size: 20,
    };
    return (
        <Link to={`/product/${product._id}`} className={cx('wrapper')}>
            <img
                src="https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg"
                alt=""
                className={cx('product-img')}
            />
            <p className={cx('product-name')}>{product.name}</p>
            <div className={cx('review')}>
                <div><ReactStars {...options} /></div>
                <span className={cx('quantity-reviews')}>
                    <span>{product.numOfReviews}</span> Reviews
                </span>
            </div>
            <span className={cx('product-price')}>${product.price}</span>
        </Link>
    );
}

export default ProductCard;
