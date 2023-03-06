import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);
function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('contact')}>
                <div className={cx('contact-left')}>
                    <div className={cx('contact-title')}>Location</div>
                    <div className={cx('contact-text')}>26 Nguyễn Văn Linh , Đà Nẵng ,Việt Nam</div>
                    <div className={cx('contact-title')}>Follow us</div>
                    <div className={cx('contact-follow-group')}>
                        <Facebook />
                        <Twitter />
                        <Instagram />
                    </div>
                    <div className={cx('contact-text')}>©2018 Privacy policy</div>
                </div>
                <div className={cx('contact-right')} id="contact">
                    <div className={cx('contact-title')}>Contact form</div>
                    <input type="text" placeholder="Enter your name..." className={cx('contact-input')} />
                    <input type="text" placeholder="Enter a valid email address..." className={cx('contact-input')} />
                    <textarea
                        rows={4}
                        className={cx('contact-textarea')}
                        placeholder="Enter your message..."
                    ></textarea>
                    <button className={cx('contact-submit')}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
