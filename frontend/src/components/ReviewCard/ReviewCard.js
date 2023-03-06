import classNames from 'classnames/bind';
import styles from './ReviewCard.module.scss';
import profileImg from '~/images/Profile.png';
import { Rating } from '@mui/material';
const cx = classNames.bind(styles);
function ReviewCard({ data = {} }) {
    const options = {
        value: data ? data.rating : 0,
        activecolor: '#eb4034',
        readOnly: true,
        precision: 0.5,
        size: 'small',
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <img src={profileImg} className={cx('avatar')} alt="avatar" />
                <p className={cx('name')}>{data.name}</p>
                <Rating {...options} />
                <span className={cx('comment')}>{data.comment}</span>
            </div>
        </>
    );
}

export default ReviewCard;
