import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import styles from './MyOrder.module.scss';
import { clearErrors, myOrders } from '~/actions/orderAction';
import { Link } from 'react-router-dom';
import Loader from '~/components/layout/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);
function MyOrder() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered' ? 'green-color' : 'red-color';
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, 'id')}`} className={cx('launch-icon')}>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                );
            },
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
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                        className={cx('orders-table')}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                    <Typography className={cx('order-heading')}>{user.name}'s Orders</Typography>
                </div>
            )}
        </div>
    );
}

export default MyOrder;
