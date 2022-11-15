import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames/bind';
import styles from './ReviewCard.module.scss';
import profileImg from '~/images/Profile.png';

const cx = classNames.bind(styles);
function ReviewCard({data = {}}) {
    const options = {
        value: data ? data.ratings : 4,
        activeColor: '#eb4034',
        readOnly: true,
        precision: 0.5,
        size: window.innerWidth > 600 ? 20 : 16,
    };
    return (
        <div className={cx('wrapper')}>
            <img src={profileImg} className={cx('avatar')} alt="avatar" />
            <p className={cx('name')}>{data.name}</p>
            <ReactStars {...options} />
            <span className={cx('comment')}>
                {data.comment}
            </span>
        </div>
    );
}

export default ReviewCard;
