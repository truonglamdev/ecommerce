import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Modal, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, deleteUser, deleteUserReset, getAllUsers } from '~/actions/userAction';
import Loader from '~/components/layout/Loader';
import Sidebar from '../Sidebar';
import styles from './UserList.module.scss';

const cx = classNames.bind(styles);
function UserList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { users, error, loading } = useSelector((state) => state.adminUsers);
    const { error: deleteError, isDeleted } = useSelector((state) => state.userAdmin);

    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');

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
        { field: 'id', headerName: 'User Id' },

        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'name',
            headerName: 'Name',
        },

        {
            field: 'role',
            headerName: 'Role',
        },

        {
            field: 'actions',
            headerName: 'Actions',
        },
    ];

    const rows = [];

    users &&
        users.forEach((user) => {
            return rows.push({
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            });
        });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOnclickBtnDelete = (id) => {
        handleOpen();
        setUserId(id);
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(userId));
        setUserId('');
        handleClose();
    };

    const handleEditUser = (id) => {
        navigate(`/admin/user/${id}`);
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
            dispatch(deleteUserReset());
            alert.success('Deleted User Successfully ! ');
            navigate();
        }

        dispatch(getAllUsers('/admin/users'));
    }, [error, dispatch, alert, deleteError, isDeleted, navigate]);
    return (
        <>
            <div className={cx('wrapper-admin-page')}>
                <div>
                    <Sidebar />
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className={cx('container-admin-page')}>
                        <table className={cx('responsive-table')}>
                            <caption>All Users</caption>
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
                                    rows.map((user) => (
                                        <tr key={user.id}>
                                            <th scope="row">{user.id}</th>
                                            <td data-title="Email">{user.email}</td>
                                            <td data-title="Name">{user.name}</td>
                                            <td data-title="Role" data-type="currency">
                                                {user.role}
                                            </td>
                                            <td data-title="Action" data-type="currency">
                                                <div className={cx('action-button')}>
                                                    <button
                                                        className={cx('edit-button', 'button')}
                                                        onClick={() => handleEditUser(user.id)}
                                                    >
                                                        <span className={cx('active-text')}>edit</span>{' '}
                                                        <FontAwesomeIcon className={cx('active-icon')} icon={faPen} />
                                                    </button>
                                                    <button
                                                        className={cx('delete-button', 'button')}
                                                        onClick={() => handleOnclickBtnDelete(user.id)}
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
                )}
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this user?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className={cx('wrap-button')}>
                                <button className={cx('button', 'delete-button')} onClick={handleDeleteUser}>
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

export default UserList;
