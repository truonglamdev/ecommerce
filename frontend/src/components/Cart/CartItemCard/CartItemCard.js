import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CartItemCard.module.scss';

const cx = classNames.bind(styles);
function CartItemCard({ item, deleteCartItems }) {
    return (
        <div className={cx('wrapper')}>
            <img src={item.image} className={cx('image')} alt={item.name} />
            <div className={cx('info-product')}>
                <Link className={cx('name')} to={`/product/${item.product}`}>
                    {item.name}
                </Link>
                <span className={cx('price')}>{`Price : ${item.price}$`}</span>
                <span className={cx('remove-btn')} onClick={() => deleteCartItems(item.product)}>
                    Remove
                </span>
            </div>
        </div>
    );
}

export default CartItemCard;
