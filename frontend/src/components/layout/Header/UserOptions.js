import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { useAlert } from 'react-alert';
import { Backdrop } from '@mui/material';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { logout } from '~/actions/userAction';
import Profile from '~/images/Profile.png';

const cx = classNames.bind(styles);
function UserOptions({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        { icon: <ListAltIcon />, title: 'Orders', func: orders },
        { icon: <PersonIcon />, title: 'Profile', func: account },
        { icon: <ShoppingCartIcon />, title: 'Cart', func: cart },
        { icon: <ExitToAppIcon />, title: 'Logout', func: logoutUser },
    ];
    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account');
    }
    function cart() {
        navigate('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success('Logout Successfully');
    }
    return (
        <>
            <Backdrop open={isOpen} style={{ zIndex: '10' }} />
            <SpeedDial
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                ariaLabel="SpeedDial basic example"
                direction="down"
                style={{ zIndex: '10', size: 'medium' }}
                open={isOpen}
                className={cx('speed-dial')}
                icon={
                    <img
                        className={cx('speed-dial-img')}
                        src={user.avatar && user.avatar.url ? user.avatar.url : Profile}
                        alt="Profile"
                    />
                }
            >
                {options.map((item, index) => (
                    <SpeedDialAction
                        key={index}
                        icon={item.icon}
                        tooltipTitle={item.title}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    );
}

export default UserOptions;
