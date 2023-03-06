import classNames from 'classnames/bind';
import styles from './UpdateProfile.module.scss';
import profileUrl from '~/images/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleUp, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { clearErrors, loadUser, updateProfile, updateProfileReset } from '~/actions/userAction';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function NewUpdateProfile() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { loading, isUpdated, error } = useSelector((state) => state.profile);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarReview, setAvatarReview] = useState(profileUrl);

    const handleUpdateProfile = (e) => {
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
            setAvatarReview(user.avatar ? user.avatar.url : profileUrl);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
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
                <div className={cx('wrapper')} onSubmit={handleUpdateProfile}>
                    <div className={cx('container')}>
                        <div className={cx('header-title')}>Edit Profile</div>
                        <div className={cx('profile-info')}>
                            <div className={cx('content-left')}>
                                <div className={cx('title')}>
                                    Photo <FontAwesomeIcon icon={faCircleUser} />
                                </div>
                                <div className={cx('form-group')}>
                                    <img src={avatarReview} className={cx('avatar')} alt="" />
                                </div>
                                <label className={cx('change-photo-btn')} htmlFor="chooseAvt">
                                    Changer de photo
                                </label>
                                <input
                                    type="file"
                                    id="chooseAvt"
                                    hidden
                                    name="avatar"
                                    onChange={(e) => updateProfileDataChange(e)}
                                    accept="image/*"
                                ></input>
                            </div>
                            <form className={cx('content-right')}>
                                <div className={cx('title')}>
                                    User Information <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('title')}>Full Name</div>
                                    <input
                                        className={cx('input')}
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>

                                <div className={cx('form-group')}>
                                    <div className={cx('title')}>Email</div>
                                    <input
                                        className={cx('input')}
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('title')}>
                                        Create At :{String(user && user.createdAt).substr(0, 10)}{' '}
                                    </div>
                                </div>

                                <div className={cx('form-group')}>
                                    <div className={cx('title')}>Role : {user && user.role ? user.role : ''}</div>
                                </div>

                                <button type="submit" className={cx('update-btn')}>
                                    Update <FontAwesomeIcon icon={faCircleUp} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewUpdateProfile;
