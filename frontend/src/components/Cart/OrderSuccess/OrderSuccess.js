import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function OrderSuccess() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faCircleCheck} />
            </span>
            <div className={cx('title')}>Your Order has been Placed successfully </div>
            <Link className={cx('view-btn')} to="/orders">
                View Orders
            </Link>
        </div>
    );
}

export default OrderSuccess;
