import { CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { faCalendarDays, faCreditCard, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import CheckoutSteps from '~/components/Cart/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '~/actions/orderAction';

const cx = classNames.bind(styles);
function Payment() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnRef = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    // const paymentData = {
    //     amount: Math.round(orderInfo.totalPrice * 100),
    // };

    const handleSubmitPayment = (e) => {
        e.preventDefault();

        alert.error('This function is updating please try again later');
        order.paymentInfo = {
            id: user._id,
            status: 'succeeded',
        };
        dispatch(createOrder(order));
        setTimeout(() => {
            navigate('/success');
        }, 2000);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('check-out')}>
                <CheckoutSteps activeStep={3} />
            </div>
            <div className={cx('container')}>
                <form className={cx('payment-form')} onSubmit={(e) => handleSubmitPayment(e)}>
                    <div className={cx('title')}>Card Information</div>
                    <div className={cx('form-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <CardNumberElement className={cx('payment-input')} />
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </div>
                        <CardCvcElement className={cx('payment-input')} />
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faKey} />
                        </div>
                        <CardExpiryElement className={cx('payment-input')} />
                    </div>
                    <input ref={btnRef} type="submit" value={`Pay`} className={cx('submit-btn')} readOnly />
                </form>
            </div>
        </div>
    );
}

export default Payment;
