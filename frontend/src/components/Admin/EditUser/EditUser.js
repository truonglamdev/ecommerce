import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getUserDetails, updateUser, updateUserReset } from '~/actions/userAction';
import Sidebar from '../Sidebar';
import styles from './EditUser.module.scss';
import profile from '~/images/Profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function EditUser() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
    const { user, error, loading } = useSelector((state) => state.userDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.userAdmin);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('role', role);
        dispatch(updateUser(params.id, myForm));
    };

    useEffect(() => {
        if (user && user._id !== params.id) {
            dispatch(getUserDetails(params.id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Updated User Successfully!');
            dispatch(updateUserReset());
            navigate('/admin/users');
        }
    }, [dispatch, alert, error, params, user, navigate, isUpdated, updateError]);
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
                        <div className={cx('container')}>
                            <div className={cx('title-header')}>User Details</div>
                            <div className={cx('title')}>Personal Information</div>
                            <div className={cx('line')}></div>

                            <div className={cx('user-info')}>
                                <div className={cx('content-left')}>
                                    <img
                                        src={
                                            user && user.avatar && user.avatar.url.includes('http')
                                                ? user.avatar.url
                                                : profile
                                        }
                                        className={cx('avatar')}
                                        alt=""
                                    />
                                </div>
                                <div className={cx('content-right')}>
                                    <form onSubmit={handleUpdateUser}>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-header')}>Full Name</div>
                                            <input
                                                type="text"
                                                className={cx('input')}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-header')}>Email</div>
                                            <input
                                                type="email"
                                                className={cx('input')}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <div className={cx('form-header')}>Role User</div>
                                            <select
                                                className={cx('input-select')}
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <button type="submit" className={cx('submit-btn')}>
                                            Save <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditUser;
