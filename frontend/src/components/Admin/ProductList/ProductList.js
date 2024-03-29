import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import Sidebar from '../Sidebar';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { clearErrors, deleteProduct, resetDeleted } from '~/actions/productAction';
import Loader from '~/components/layout/Loader';
const cx = classNames.bind(styles);
function ProductList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [idProduct, setIdProduct] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { products, error } = useSelector((state) => state.adminProducts);
    const { error: deleteError, isDeleted, loading } = useSelector((state) => state.deleteProduct);

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
        { field: 'id', headerName: 'Product ID' },

        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'stock',
            headerName: 'Stock',
        },

        {
            field: 'price',
            headerName: 'Price',
        },

        {
            field: 'actions',
            headerName: 'Actions',
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            return rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    const handleEditProduct = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const handleOnclickBtnDelete = (id) => {
        handleOpen();
        setIdProduct(id);
    };

    const handleDelete = () => {
        dispatch(deleteProduct(idProduct));
        handleClose();
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
            alert.success('Product Deleted Successfully');
            navigate('/admin/dashboard');
            dispatch(resetDeleted());
        }

        // dispatch(adminProducts());
    }, [alert, isDeleted, deleteError, dispatch, navigate, error]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper-admin-page')}>
                    <div>
                        <Sidebar />
                    </div>
                    <div className={cx('container-admin-page')}>
                        <table className={cx('responsive-table')}>
                            <caption>All Products</caption>
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
                                    rows.map((product) => (
                                        <tr key={product.id}>
                                            <th scope="row">{product.id}</th>
                                            <td data-title="Name">{product.name}</td>
                                            <td data-title="Stock">{product.stock}</td>
                                            <td data-title="Price" data-type="currency">
                                                {product.price}
                                            </td>
                                            <td data-title="Action" data-type="currency">
                                                <div className={cx('action-button')}>
                                                    <button
                                                        className={cx('edit-button', 'button')}
                                                        onClick={() => handleEditProduct(product.id)}
                                                    >
                                                        <span className={cx('active-text')}>edit</span>{' '}
                                                        <FontAwesomeIcon className={cx('active-icon')} icon={faPen} />
                                                    </button>
                                                    <button
                                                        className={cx('delete-button', 'button')}
                                                        onClick={() => handleOnclickBtnDelete(product.id)}
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
                            Are you sure you want to delete this product?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className={cx('wrap-button')}>
                                <button className={cx('button', 'delete-button')} onClick={handleDelete}>
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

export default ProductList;
