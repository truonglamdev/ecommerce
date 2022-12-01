import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '~/actions/userAction';
import Loader from '~/components/layout/Loader';
import styles from './ForgotPassword.module.scss';

const cx = classNames.bind(styles);
function ForgotPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, message } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('email', email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('title')}>
                            <span>Forgot Password</span>
                            <p className={cx('under-light')}></p>
                        </div>

                        <form
                            encType="multipart/form-data"
                            className={cx('form-forgot-password')}
                            onSubmit={forgotPasswordSubmit}
                        >
                            <div className={cx('email')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    className={cx('email-input')}
                                    type="email"
                                    placeholder="Enter your email..."
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Send" placeholder="Send" className={cx('send-btn')} />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPassword;
