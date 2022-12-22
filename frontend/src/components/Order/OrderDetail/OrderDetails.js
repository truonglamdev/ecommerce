import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '~/actions/orderAction';
import styles from './OrderDetails.module.scss';

const cx = classNames.bind(styles);
function OrderDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { order, loading, error } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        const id = params.id;
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (id) {
            dispatch(getOrderDetails(id));
        }
    }, [alert, dispatch, error, params]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page')}>
                <div className={cx('container')}>
                    <h2 className={cx('order-id')}>Order id {order && order._id ? order._id : ''}</h2>
                    <h1 className={cx('title')}>Shipping Information</h1>
                    <div className={cx('order-box')}>
                        <div className={cx('form-group')}>
                            <span>Name : </span>
                            <p>{order && order.user ? order.user.name : ''}</p>
                        </div>
                        <div className={cx('form-group')}>
                            <span>Phone Number : </span>
                            <p>{order && order.shippingInfo ? order.shippingInfo.phoneNo : ''}</p>
                        </div>
                        <div className={cx('form-group')}>
                            <span>Address : </span>
                            <p>
                                {order && order.shippingInfo
                                    ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                                    : ''}
                            </p>
                        </div>
                    </div>
                    <h1 className={cx('title')}>Payment Information : </h1>
                    <div className={cx('order-box')}>
                        <div>
                            <p
                                className={cx(
                                    order && order.paymentInfo.status === 'succeeded' ? 'success-color' : 'error-color',
                                )}
                            >
                                {order && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                            </p>
                        </div>
                        <div>
                            <span>Amount : </span>
                            <p>{order && order.totalPrice ? order.totalPrice : ''}</p>
                        </div>
                    </div>
                    <h1 className={cx('title')}>Order Status</h1>
                    <div className={cx('order-box')}>
                        <div>
                            <p
                                className={cx(
                                    order && order.orderStatus === 'Delivered' ? 'success-color' : 'error-color',
                                )}
                            >
                                {order && order.orderStatus ? order.orderStatus : ''}
                            </p>
                        </div>
                    </div>
                    <h1 className={cx('title')}>Order Items: </h1>
                    <div className={cx('order-cart-box')}>
                        {order &&
                            order.orderItems &&
                            order.orderItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X ₹{item.price} = <b>${item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
