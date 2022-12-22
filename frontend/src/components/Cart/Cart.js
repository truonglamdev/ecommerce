import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import CartItemCard from './CartItemCard';
import { addItemsToCart, removeItemFromCart } from '~/actions/cartAction';
import emptyCart from '~/images/empty-cart.png';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (newQuantity >= stock) return;
        dispatch(addItemsToCart(id, newQuantity));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 1) return;
        dispatch(addItemsToCart(id, newQuantity));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleCheckOut = () => {
        navigate('/login');
        navigate('/shipping');
    };
    return (
        <div className={cx('wrapper')}>
            {cartItems.length === 0 ? (
                <div className={cx('empty-cart')}>
                    <img src={emptyCart} alt="empty-cart" className={cx('empty-cart-img')} />
                    <Link to="/products" className={cx('views-btn')}>
                        View Products
                    </Link>
                </div>
            ) : (
                <>
                    {' '}
                    <div className={cx('container')}>
                        <div className={cx('header')}>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item, index) => (
                                <div className={cx('cart-box')} key={index}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className={cx('cart-input')}>
                                        <button
                                            className={cx('quantity-btn')}
                                            onClick={() => decreaseQuantity(item.product, item.quantity)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className={cx('quantity-input')}
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <button
                                            className={cx('quantity-btn')}
                                            onClick={() => increaseQuantity(item.product, item.quantity, item.Stock)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className={cx('total-price')}>{`${item.price * item.quantity}$`}</div>
                                </div>
                            ))}
                    </div>
                    <div className={cx('cart-gross-profit')}>
                        <div></div>
                        <div className={cx('gross-profit-box')}>
                            <p>Gross Total</p>
                            <p>{`${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}$`}</p>
                        </div>
                        <div></div>
                        <div className={cx('check-out')}>
                            <button className={cx('check-out-btn')} onClick={handleCheckOut}>
                                Check Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
