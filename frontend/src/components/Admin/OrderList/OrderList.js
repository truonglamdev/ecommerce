import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { clearErrors, deleteOrder, getAllOrders, resetDeleteOrder } from '~/actions/orderAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Box, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function OrderList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [idOrder, setIdOrder] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { orders, loading, error } = useSelector((state) => state.adminOrders);
    const { error: deleteError, isDeleted, loading: deleteLoading } = useSelector((state) => state.order);

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth > 600 ? 400 : 280,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '6px',
        boxShadow: 24,
        p: 4,
    };

    const columns = [
        { field: 'id', headerName: 'Order Id' },

        {
            field: 'status',
            headerName: 'Status',
        },
        {
            field: 'itemsQty',
            headerName: 'Item Quantity',
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
            return rows.push({
                id: item._id,
                orderStatus: item.orderStatus,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
            });
        });

    const handleOnclickBtnDelete = (id) => {
        handleOpen();
        setIdOrder(id);
    };

    const handleDeleteOrder = () => {
        dispatch(deleteOrder(idOrder));
        handleClose();
        setIdOrder('');
    };

    const handleEditOrder = (id) => {
        navigate(`/admin/order/${id}`);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success('Deleted Order Successfully');
            dispatch(resetDeleteOrder());
            navigate('/admin/orders');
        }
        dispatch(getAllOrders());
    }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

    return (
        <>
            {loading && deleteLoading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper-admin-page')}>
                    <div>
                        <Sidebar />
                    </div>
                    <div className={cx('container-admin-page')}>
                        <table className={cx('responsive-table')}>
                            <caption>All Orders</caption>
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
                                            <td data-title="Status">{order.orderStatus}</td>
                                            <td data-title="Item Quantity">{order.itemsQty}</td>
                                            <td data-title="Amount" data-type="currency">
                                                {order.amount}
                                            </td>
                                            <td data-title="Action" data-type="currency">
                                                <div className={cx('action-button')}>
                                                    <button
                                                        className={cx('edit-button', 'button')}
                                                        onClick={() => handleEditOrder(order.id)}
                                                    >
                                                        <span className={cx('active-text')}>edit</span>{' '}
                                                        <FontAwesomeIcon className={cx('active-icon')} icon={faPen} />
                                                    </button>
                                                    <button
                                                        className={cx('delete-button', 'button')}
                                                        onClick={() => handleOnclickBtnDelete(order.id)}
                                                    >
                                                        <span className={cx('active-text')}>delete</span>
                                                        <FontAwesomeIcon className={cx('active-icon')} icon={faTrash} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this order?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className={cx('wrap-button')}>
                                <button className={cx('button', 'delete-button')} onClick={handleDeleteOrder}>
                                    Delete
                                </button>
                                <button className={cx('button', 'cancel-button')} onClick={handleClose}>
                                    Cancel
                                </button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default OrderList;
