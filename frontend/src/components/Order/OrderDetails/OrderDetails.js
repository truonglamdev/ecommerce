import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '~/actions/orderAction';
import Loader from '~/components/layout/Loader';
import styles from './OrderDetails.module.scss';

const cx = classNames.bind(styles);
function OrderDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { order, loading, error } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [alert, dispatch, error, params]);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('page')}>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <div className={cx('title')}>Shipping Information</div>
                            <div className={cx('form-group')}>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Name : </strong>
                                    <span className={cx('text')}>{order && order.user && order.user.name}</span>
                                </div>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Phone Number : </strong>
                                    <span className={cx('text')}>
                                        {order && order.shippingInfo && order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Address : </strong>
                                    <span className={cx('text')}>
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('title')}>Payment</div>
                            <div className={cx('form-group')}>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Paid : </strong>{' '}
                                    <span className={cx('text')}>
                                        {order.paymentInfo && order.paymentInfo.status === 'succeeded'
                                            ? 'PAID'
                                            : 'NOT PAID'}
                                    </span>
                                </div>
                                {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? (
                                    <div className={cx('wrap')}>
                                        <strong className={cx('bold')}>Paid At : </strong>{' '}
                                        <span className={cx('text')}> {order && order.createdAt}</span>
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Amount : </strong>{' '}
                                    <span className={cx('text')}>{order.totalPrice && order.totalPrice}</span>
                                </div>
                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('title')}>Order Status</div>
                            <div className={cx('form-group')}>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Status : </strong>{' '}
                                    <span className={cx('text')}> {order.orderStatus && order.orderStatus}</span>
                                </div>
                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('title')}>Order Date</div>
                            <div className={cx('form-group')}>
                                <div className={cx('wrap')}>
                                    <strong className={cx('bold')}>Date : </strong>{' '}
                                    <span className={cx('text')}>{String(order && order.createdAt).substr(0, 10)}</span>
                                </div>

                                <div className={cx('line')}></div>
                            </div>
                        </div>

                        <div className={cx('content-right')}>
                            <div className={cx('title')}>Cart Item</div>
                            <div className={cx('form-group')}>
                                {order &&
                                    order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div className={cx('product-box')} key={item.product}>
                                            <div className={cx('product-info')}>
                                                <img src={item.image} alt="" className={cx('product-img')} />
                                                <div className={cx('wrap-column')}>
                                                    <Link to={`/product/${item.product}`}>
                                                        <strong className={cx('bold', 'product-name')}>
                                                            {item.name}
                                                        </strong>
                                                    </Link>
                                                    <span className={cx('text')}>Quantity : {item.quantity}</span>
                                                    <span className={cx('text')}>Price : ${item.price}</span>
                                                </div>
                                            </div>
                                            <div className={cx('total-price')}>
                                                <strong className={cx('bold')}>${item.quantity * item.price}</strong>
                                            </div>
                                        </div>
                                    ))}

                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('form-group')}>
                                <div className={cx('total-price')}>
                                    <div className={cx('wrap-price')}>
                                        <div className={cx('des-price')}>Subtotal :</div>
                                        <strong className={cx('price')}>${order && order.itemsPrice}</strong>
                                    </div>

                                    <div className={cx('wrap-price')}>
                                        <div className={cx('des-price')}>Shipping Fee : </div>
                                        <strong className={cx('price')}>${order && order.shippingPrice}</strong>
                                    </div>
                                    <div className={cx('wrap-price')}>
                                        <div className={cx('des-price')}>Tax Fee : </div>
                                        <strong className={cx('price')}>${order && order.taxPrice}</strong>
                                    </div>
                                    <div className={cx('line-solid')}></div>
                                    <div className={cx('wrap-price')}>
                                        <div className={cx('des-price')}>Total Price : </div>
                                        <strong className={cx('price')}>${order && order.totalPrice}</strong>
                                    </div>
                                </div>
                                <div className={cx('line')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;
