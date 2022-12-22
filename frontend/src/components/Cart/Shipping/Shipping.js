import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Country, State } from 'country-state-city';
import classNames from 'classnames/bind';
import styles from './Shipping.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCity,
    faEarthAmericas,
    faHouse,
    faLocationDot,
    faPersonSkating,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';

import CheckoutSteps from '~/components/Cart/CheckoutSteps';
import { saveShippingInfo } from '~/actions/cartAction';

const cx = classNames.bind(styles);
function Shipping() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [country, setCountry] = useState(shippingInfo.country);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [state, setState] = useState(shippingInfo.state);
    const [address, setAddress] = useState(shippingInfo.address);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error('Phone Number should be 10 digits Long');
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        navigate('/order/confirm');
    };

    return (
        <div className={cx('wrapper')}>
            <CheckoutSteps activeStep={0} />
            <div className={cx('container')}>
                <h2 className={cx('title')}>Shipping Details</h2>
                <form className={cx('shipping-form')} encType="multipart/form-data" onSubmit={shippingSubmit}>
                    <div className={cx('input-box')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faHouse} />
                        </span>
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            className={cx('input')}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-box')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCity} />
                        </span>
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('input-box')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        <input
                            type="number"
                            placeholder="Pin Code"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            required
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('input-box')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            className={cx('input')}
                            size={10}
                        />
                    </div>
                    <div className={cx('input-box')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faEarthAmericas} />
                        </span>
                        <select
                            required
                            className={cx('select')}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Country</option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {country && (
                        <div className={cx('input-box')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faPersonSkating} />
                            </span>
                            <select
                                required
                                className={cx('select')}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    <input
                        type="submit"
                        value="Continue"
                        disabled={state ? false : true}
                        className={cx('shipping-btn')}
                    />
                </form>
            </div>
        </div>
    );
}

export default Shipping;
