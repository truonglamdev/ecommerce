import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import Loader from '~/components/layout/Loader';
import { clearErrors, loadUser, updateProfile, updateProfileReset } from '~/actions/userAction';
import styles from './UpdateProfile.module.scss';
import profile from '~/images/Profile.png';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function UpdateProfile() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { loading, isUpdated, error } = useSelector((state) => state.profile);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarReview, setAvatarReview] = useState(profile);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
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
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarReview(user.avatar.url);
        }

        if (error) {
            alert.error(error.message);
            dispatch(clearErrors);
        }

        if (isUpdated) {
            alert.success('Profile Updated Successfully!');
            dispatch(loadUser());
            navigate('/account');
            dispatch(updateProfileReset());
        }
    }, [user, dispatch, error, alert, isUpdated, navigate]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('title')}>
                            <span>Update Profile</span>
                            <p className={cx('under-light')}></p>
                        </div>

                        <form
                            encType="multipart/form-data"
                            className={cx('form-update')}
                            onSubmit={updateProfileSubmit}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={cx('update-img')}>
                                <img src={avatarReview} alt="Avatar Preview" className={cx('profile-img')} />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={(e) => updateProfileDataChange(e)}
                                />
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

export default UpdateProfile;
