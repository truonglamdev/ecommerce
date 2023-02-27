import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserDetails } from '~/actions/userAction';
import styles from './ListReview.module.scss';
import profileUrl from '~/images/Profile.png';

const cx = classNames.bind(styles);
function InfoUserReview({ review }) {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, error, loading } = useSelector((state) => state.userDetails);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (review && review.userId) {
            dispatch(getUserDetails(review.userId));
        }
    }, [error, dispatch, alert, review]);
    return (
        <>
            {loading ? (
                <div></div>
            ) : (
                <div className={cx('wrapper-info-user')}>
                    <div className={cx('info-user-left')}>
                        <img src={user && user.avatar ? user.avatar.url : profileUrl} className={cx('avatar')} alt="" />
                    </div>
                    <div className={cx('info-user-right')}>
                        <div className={cx('header')}>
                            <div className={cx('name')}>{user && user.name}</div>

                            <div className={cx('review-date')}>20-10-2022</div>
                        </div>
                        <div className={cx('review')}>{review && review.comment}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default InfoUserReview;
