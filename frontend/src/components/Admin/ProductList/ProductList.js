import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import Sidebar from '../Sidebar';
import { clearErrors, deleteProduct, resetDeleted } from '~/actions/productAction';
import Table from '~/components/Table';

const cx = classNames.bind(styles);
function ProductList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { products, error } = useSelector((state) => state.adminProducts);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 120, flex: 0.5 },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 120,
            flex: 0.3,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 130,
            flex: 0.3,
        },

        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 130,
            flex: 0.3,
        },

        {
            field: 'actions',
            flex: 0.6,
            headerName: 'Actions',
            minWidth: 180,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link className={cx('edit-btn')} to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        <Button>
                            <span
                                className={cx('delete-btn')}
                                onClick={() => handleDeleteProduct(params.getValue(params.id, 'id'))}
                            >
                                <DeleteIcon />
                            </span>
                        </Button>
                    </>
                );
            },
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

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
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
        <div className={cx('wrapper')}>
            <div>
                <Sidebar />
            </div>
            <div className={cx('container')}>
                <h2 className={cx('title')}>ALL PRODUCTS</h2>

                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    className={cx('product-table')}
                    autoHeight
                />
                <Table />
            </div>
        </div>
    );
}

export default ProductList;
