import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import appStore from '~/images/appStore.png';
import googlePlay from '~/images/googlePlay.png';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer id="footer" className={cx('wrapper')}>
            <div className={cx('footer-left')}>
                <h4 className={cx('title')}>DOWNLOAD OUR APP</h4>
                <p className={cx('sub')}>Download App for Android and IOS mobile phone</p>
                <img src={appStore} className={cx('img')} alt="" />
                <img src={googlePlay} className={cx('img')} alt="" />
            </div>
            <div className={cx('footer-mid')}>
                <h1 className={cx('name')}>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2021 &copy; MeAbhiSingh</p>
            </div>
            <div className={cx('footer-right')}>
                <h4>Follow Us</h4>
                <a className={cx('link')} href="http://instagram.com">
                    Instagram
                </a>
                <a className={cx('link')} href="http://youtube.com">
                    Youtube
                </a>
                <a className={cx('link')} href="http://facebook.com">
                    Facebook
                </a>
            </div>
        </footer>
    );
}

export default Footer;
