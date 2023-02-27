import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Loader from '~/components/layout/Loader';
import ProfileImg from '~/images/Profile.png';

const cx = classNames.bind(styles);
function Profile() {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('content-left')}>
                        <h2 className={cx('title')}>My Profile</h2>
                        <img
                            src={user && user.avatar && user.avatar.url ? user.avatar.url : ProfileImg}
                            className={cx('avatar')}
                            alt="Avatar"
                        />
                        <Link to="/auth/me/update" className={cx('edit-btn')}>
                            Edit Profile
                        </Link>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('group')}>
                            <h4 className={cx('label')}>Full Name</h4>
                            <p className={cx('name')}>{user && user.name}</p>
                        </div>
                        <div className={cx('group')}>
                            <h4 className={cx('label')}>Email</h4>
                            <p className={cx('name')}>{user && user.email}</p>
                        </div>
                        <div className={cx('group')}>
                            <h4 className={cx('label')}>Joined On</h4>
                            <p className={cx('name')}>{String(user && user.createdAt).substr(0, 10)}</p>
                        </div>

                        <div className={cx('group')}>
                            <Link to="/orders" className={cx('order-btn')}>
                                My Orders
                            </Link>
                            <Link to="/auth/password/update" className={cx('change-password')}>
                                Change Password
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
