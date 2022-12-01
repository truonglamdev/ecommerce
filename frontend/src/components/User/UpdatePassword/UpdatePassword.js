import { faEye, faEyeSlash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword, updatePasswordReset } from '~/actions/userAction';
import Loader from '~/components/layout/Loader';
import styles from './UpdatePassword.module.scss';

const cx = classNames.bind(styles);
function UpdatePassword() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const { loading, error, isUpdated } = useSelector((state) => state.profile);
    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmPassword', confirmPassword);

        dispatch(updatePassword(myForm))
    };

    const handleShowPassword = (name) => {
        if (name === 'oldPassword') {
            setIsShowOldPassword((prev) => !prev);
        }
        if (name === 'newPassword') {
            setIsShowNewPassword((prev) => !prev);
        }
        if (name === 'confirmPassword') {
            setIsShowConfirmPassword((prev) => !prev);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error.message);
            dispatch(clearErrors);
        }

        if (isUpdated) {
            alert.success('Profile Updated Successfully!');
            navigate('/account');

            dispatch(updatePasswordReset());
        }
    }, [dispatch, error, alert, isUpdated, navigate]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('title')}>
                            <span>Update Password</span>
                            <p className={cx('under-light')}></p>
                        </div>

                        <form
                            encType="multipart/form-data"
                            className={cx('form-update')}
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className={cx('password')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                                <input
                                    className={cx('password-input')}
                                    type={isShowOldPassword ? 'text' : 'password'}
                                    placeholder="Enter your old password..."
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <span className={cx('icon-eye')} onClick={() => handleShowPassword('oldPassword')}>
                                    {isShowOldPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            <div className={cx('password')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                                <input
                                    className={cx('password-input')}
                                    type={isShowNewPassword ? 'text' : 'password'}
                                    placeholder="Enter new password..."
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span className={cx('icon-eye')} onClick={() => handleShowPassword('newPassword')}>
                                    {isShowNewPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            <div className={cx('password')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                                <input
                                    className={cx('password-input')}
                                    type={isShowConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm  password..."
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span className={cx('icon-eye')} onClick={() => handleShowPassword('confirmPassword')}>
                                    {isShowConfirmPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            <input
                                type="submit"
                                value="Update"
                                placeholder="Choose file"
                                className={cx('update-btn')}
                            />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdatePassword;
