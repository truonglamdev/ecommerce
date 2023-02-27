import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import classNames from 'classnames/bind';
import styles from './MyOrder.module.scss';
import { clearErrors, myOrders } from '~/actions/orderAction';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function MyOrder() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    // const { user } = useSelector((state) => state.user);

    const columns = [
        { field: 'id', headerName: 'Order Id', },
        {
            field: 'status',
            headerName: 'Status',
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
        },
        {
            field: 'amount',
            headerName: 'Amount',
        },

        {
            field: 'actions',
            headerName: 'Actions',
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('container')}>
                    <table className={cx('responsive-table')}>
                        <caption>My Orders</caption>
                        <thead>
                            <tr>
                                {columns &&
                                    columns.map((column, index) => (
                                        <th key={index} scope="col">
                                            {column.headerName}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows &&
                                rows.map((order) => (
                                    <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
                                        <td data-title="Status">{order.status}</td>
                                        <td data-title="Item Quantity">{order.itemsQty}</td>
                                        <td data-title="Amount" data-type="currency">
                                            {order.amount}
                                        </td>
                                        <td data-title="Action" data-type="currency">
                                            <div className={cx('action-button')}>
                                                <Link to={`/order/${order.id}`} className={cx('launch-icon')}>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyOrder;
