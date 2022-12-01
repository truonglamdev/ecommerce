import React from 'react';
import { Link } from 'react-router-dom';
import { ReactNavbar } from 'overlay-navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

import logo from '~/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const options = {
        burgerColorHover: '#eb4034',
        logo: logo,
        logoWidth: '260px',
        navColor1: '#fff',
        logoHoverSize: '10px',
        logoHoverColor: '#eb4034',
        link1Text: 'Home',
        link2Text: 'Products',
        link3Text: 'Contact',
        link4Text: 'About',
        link1Url: '/',
        link2Url: '/products',
        link3Url: '/contact',
        link4Url: '/about',
        link1Size: '1.8rem',
        link1Color: 'rgba(35, 35, 35,0.8)',
        nav1justifyContent: 'center',
        nav2justifyContent: 'flex-end',
        nav3justifyContent: 'flex-start',
        nav4justifyContent: 'center',
        link1ColorHover: '#eb4034',
        link1Margin: '1.8rem',
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bar-box')}>
                <ReactNavbar {...options} />
            </div>
            <div className={cx('logo')}>
                <Link to="/">
                    <img className={cx('logo-img')} src={logo} alt="logo" />
                </Link>
            </div>
            <div className={cx('actions')}>
                <Link className={cx('icon')} to="/search">
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
                <Link className={cx('icon')} to="/login">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link className={cx('icon')} to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
            </div>
        </div>
    );
}

export default Header;
