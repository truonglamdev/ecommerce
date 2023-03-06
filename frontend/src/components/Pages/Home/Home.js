import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Zoom } from 'react-slideshow-image';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import ProductCard from '~/components/ProductCard';
import { getProducts } from '~/actions/productAction';
import Loader from '~/components/layout/Loader';

import image1 from '~/images/homeImages/banner1.jpg';
import image2 from '~/images/homeImages/banner2.webp';
import image3 from '~/images/homeImages/banner3.webp';
import Contact from '../Contact';
const cx = classNames.bind(styles);
function Home() {
    const slideImages = [
        {
            url: 'https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg',
        },
        {
            url: 'https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg',
        },
        {
            url: 'https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg',
        },
        {
            url: 'https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg',
        },
        {
            url: 'https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg',
        },
        {
            url: 'https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg',
        },
    ];
    const buttonStyle = {
        width: window.innerWidth < 600 ? '28px' : '36px',
        height: window.innerWidth < 600 ? '28px' : '36px',
        padding: '6px',
        background: '#ccc',
        border: '0px',
        borderRadius: '50%',
        zIndex: '2',
    };

    const properties = {
        prevArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
                </svg>
            </button>
        ),
    };

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const now = new Date();
    const currentMonth = months[now.getMonth()];

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    {/* <MetaData title="PRODUCTS -- ECOMMERCE"/> */}
                    <div className={cx('banner-slider')}>
                        <Zoom autoplay={true} duration={2000} {...properties}>
                            {slideImages &&
                                slideImages.map((image, index) => (
                                    <div key={index} className="slide-container">
                                        <img
                                            src={image.url}
                                            alt={`slideImage-${index}`}
                                            className={cx('slide-image')}
                                        />
                                    </div>
                                ))}
                        </Zoom>

                        <div className={cx('best-product')}>
                            <div className={cx('product-item')}>
                                <div className={cx('product-title')}>Electronics</div>
                                <Link to="/products">
                                    <div className={cx('product-box')}>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Chair_2x._SY232_CB667159060_.jpg"
                                                alt=""
                                            />
                                            <div>Chairs</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_2x._SY232_CB667159060_.jpg"
                                                alt=""
                                            />
                                            <div>Headsets</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Keyboard_2x._SY232_CB667159063_.jpg"
                                                alt=""
                                            />
                                            <div>Keyboards</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg"
                                                alt=""
                                            />
                                            <div>Computer mice</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('product-item')}>
                                <div className={cx('product-title')}>Refresh your space</div>
                                <Link to="/products">
                                    <div className={cx('product-box')}>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_372x232_LP-HP_B08MYX5Q2W_01.23._SY232_CB619238939_.jpg"
                                                alt=""
                                            />
                                            <div>Dining</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_372x232_kitchen_B0126LMDFK_01.23._SY232_CB619238939_.jpg"
                                                alt=""
                                            />
                                            <div>Kitchen</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_372x232_health-beauty_B07662GN57_01.23._SY232_CB619238939_.jpg"
                                                alt=""
                                            />
                                            <div>Health and beauty</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_372x232_home_B08RCCP3HV_01.23._SY232_CB619238939_.jpg"
                                                alt=""
                                            />
                                            <div>Home</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('product-item')}>
                                <div className={cx('product-title')}>Shop by Category</div>
                                <Link to="/products">
                                    <div className={cx('product-box')}>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/computer240x._SY170_CB468850970_.jpg"
                                                alt=""
                                            />
                                            <div>Computer and laptop</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/August/DashboardCard/PS4_240X._SY170_CB438749318_.jpg"
                                                alt=""
                                            />
                                            <div>Video games</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/Baby240X._SY170_CB468850909_.jpg"
                                                alt=""
                                            />
                                            <div>Camera</div>
                                        </div>
                                        <div className={cx('form-group')}>
                                            <img
                                                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_2x._SY232_CB667159060_.jpg"
                                                alt=""
                                            />
                                            <div>Headsets</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('product-item')}>
                                <div className={cx('product-title')}>See all products here</div>
                                <div className={cx('product-box')}>
                                    <Link to="/products" className={cx('see-all-btn')}>
                                        See all
                                    </Link>
                                    <img
                                        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_2x._CB418309979_.jpg"
                                        alt=""
                                        className={cx('banner-shipping')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('product-ads')}>
                        <div className={cx('content-left')}>
                            <div className={cx('title-left')}>{`${currentMonth} Expo 2023`}</div>
                            <span className={cx('text-left')}>Source 2023's latest product trends</span>
                            <Link to="/products">
                                <button className={cx('see-new-btn')}>See What's New</button>
                            </Link>
                        </div>
                        <div className={cx('content-right')}>
                            <div className={cx('right-item')}>
                                <div className={cx('wrap-item')}>
                                    <div>Lowest prices in 90 days</div>
                                    <p>Save with low prices and On-time</p>
                                    <img src={image1} alt="" />
                                </div>
                                <div className={cx('wrap-item')}>
                                    <div>Lowest prices in 90 days</div>
                                    <p>Save with low prices and On-time</p>
                                    <img src={image2} alt="" />
                                </div>
                                <div className={cx('wrap-item')}>
                                    <div>Lowest prices in 90 days</div>
                                    <p>Save with low prices and On-time</p>
                                    <img src={image3} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className={cx('home-header')} id="container">
                        Featured Products
                    </h2>
                    <div className={cx('product-container')}>
                        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                    <Contact />
                </div>
            )}
        </>
    );
}

export default Home;
