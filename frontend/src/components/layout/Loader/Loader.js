import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);
function Loader() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loading')}></div>
        </div>
    );
}

export default Loader;
