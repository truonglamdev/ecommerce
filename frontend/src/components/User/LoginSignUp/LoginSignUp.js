import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './LoginSignUp.module.scss';

import { login, clearErrors, register } from '~/actions/userAction';
import profile from '~/images/Profile.png';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function LoginSignUp() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const [isLogin, setIsLogin] = useState('login');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [avatarReview, setAvatarReview] = useState(profile);
    const [avatar, setAvatar] = useState(profile);
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
    });

    const switchTabs = (e, tab) => {
        setIsLogin(tab);
    };

    const { name, email, password } = user;

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        myForm.set('name', name);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            let files = e.target.files;
            // let file;

            for (let i = 0; i < files.length; i++) {
                (function (file) {
                    var reader = new FileReader();
                    reader.onload = (file) => {
                        if (reader.readyState === 2) {
                            setAvatarReview(reader.result);
                            setAvatar(reader.result);
                        }
                    };
                    reader.readAsDataURL(file);
                })(files[i]);
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleShowPassword = () => {
        setIsShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (isAuthenticated) {
            history('/acount');
        }
    }, [error, dispatch, alert, isAuthenticated, history]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div>
                            <div className={cx('login-signup-toggle')}>
                                <p className={cx('title')} onClick={(e) => switchTabs(e, 'login')}>
                                    LOGIN
                                </p>
                                <p className={cx('title')} onClick={(e) => switchTabs(e, 'register')}>
                                    REGISTER
                                </p>
                            </div>
                            <button
                                className={cx('toggle-btn', isLogin === 'login' ? 'shiftToNeutral' : 'shiftToRight')}
                            ></button>
                        </div>
                        <form
                            className={cx('form-login', isLogin !== 'login' ? 'shiftToLeft' : '')}
                            onSubmit={handleSubmitLogin}
                        >
                            <div className={cx('email')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    className={cx('email-input')}
                                    type="text"
                                    placeholder="Enter your email..."
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className={cx('password')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                                <input
                                    className={cx('password-input')}
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password..."
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <span className={cx('icon-eye')} onClick={handleShowPassword}>
                                    {isShowPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>

                            <Link className={cx('forgot')} to="/password/forgot">
                                Forgot Password ?
                            </Link>
                            <input type="submit" value="Login" className={cx('login-btn')} />
                        </form>

                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmitRegister}
                            className={cx('form-register', isLogin !== 'login' ? 'shiftToNeutralForm' : '')}
                        >
                            <div className={cx('name')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    className={cx('name-input')}
                                    type="text"
                                    placeholder="Enter your name..."
                                    name="name"
                                    required
                                    onChange={(e) => registerDataChange(e)}
                                />
                            </div>
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
                                    onChange={(e) => registerDataChange(e)}
                                />
                            </div>
                            <div className={cx('password')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                                <input
                                    className={cx('password-input')}
                                    type="password"
                                    placeholder="Enter your password..."
                                    name="password"
                                    required
                                    onChange={(e) => registerDataChange(e)}
                                />
                            </div>
                            <div className={cx('register-img')}>
                                <img src={avatarReview} alt="Avatar Preview" className={cx('profile-img')} />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(e) => registerDataChange(e)}
                                />
                            </div>

                            <input type="submit" value="Register" className={cx('register-btn')} />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginSignUp;
