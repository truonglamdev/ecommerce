import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps';
import styles from './ConfirmOrder.module.scss';

const cx = classNames.bind(styles);
function ConfirmOrder() {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    const handleProceed = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/process/payment');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('checkOut-box')}>
                {' '}
                <CheckoutSteps activeStep={1} />
            </div>
            <div className={cx('container')}>
                <div className={cx('content-left')}>
                    <div className={cx('shipping-info')}>
                        <div className={cx('title')}>Shipping Information</div>
                        <div className={cx('shipping-info-confirm')}>
                            <div>
                                <p>Name :{'  '} </p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone number :{'  '}</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address : {'  '}</p>
                                <span>{address ? address : ''}</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('cart-items')}>
                        <div className={cx('title')}>Your cart items </div>
                        <div className={cx('cart-items-confirm')}>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product} className={cx('product')}>
                                        <img src={item.image} alt={item.name} className={cx('product-image')} />
                                        <div className={cx('product-info')}>
                                            <Link to={`/product/${item.product}`} className={cx('product-name')}>
                                                {item.name}
                                            </Link>
                                            <span className={cx('product-price')}>
                                                {item.quantity} x ${item.price} = <b>${item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className={cx('content-right')}>
                    <div className={cx('title')}>Order Summery</div>
                    <div className={cx('summery-box')}>
                        <div>
                            <p>Subtotal:</p>
                            <span>{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>{shippingCharges}$</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>{tax}$</span>
                        </div>
                    </div>

                    <div className={cx('order-summary-total')}>
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>{totalPrice}$</span>
                    </div>

                    <button className={cx('proceed-btn')} onClick={handleProceed}>
                        Proceed To Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
