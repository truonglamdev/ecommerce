import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '~/components/layout/Loader';

import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '~/actions/userAction';

const cx = classNames.bind(styles);
function ResetPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('password', newPassword);
        myForm.set('confirmPassword', confirmPassword);
        const token = params.token;
        dispatch(resetPassword(token, myForm));
    };
    const handleShowPassword = (name) => {
        if (name === 'newPassword') {
            setIsShowNewPassword((prev) => !prev);
        }
        if (name === 'confirmPassword') {
            setIsShowConfirmPassword((prev) => !prev);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Password Updated Successfully');

            navigate('/login');
        }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('title')}>
                            <span>Reset Password</span>
                            <p className={cx('under-light')}></p>
                        </div>

                        <form
                            encType="multipart/form-data"
                            className={cx('form-update')}
                            onSubmit={resetPasswordSubmit}
                        >
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
                                value="Reset"
                                placeholder="send"
                                className={cx('update-btn')}
                            />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ResetPassword;
