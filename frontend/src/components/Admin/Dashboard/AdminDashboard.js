import { faCircleCheck, faCircleDollarToSlot, faCircleUser, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllOrders, clearErrors as clearOrderErrors } from '~/actions/orderAction';
import { adminProducts, getDetailProduct } from '~/actions/productAction';
import { clearErrors as clearProductErrors } from '~/actions/productAction';
import { clearErrors, getAllUsers } from '~/actions/userAction';
import Sidebar from '../Sidebar';
import styles from './Dashboard.module.scss';
import noImage from '~/images/no-image.png';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Chart, ArcElement } from 'chart.js';
import Select from 'react-select';
import Loader from '~/components/layout/Loader';
Chart.register(ArcElement);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const cx = classNames.bind(styles);

function AdminDashboard() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { users, user: userError } = useSelector((state) => state.adminUsers);
    const { products, error: productError, productsLoading } = useSelector((state) => state.adminProducts);
    const { product, error: detailsProduct, loading } = useSelector((state) => state.productDetails);
    const { orders, error: orderError } = useSelector((state) => state.adminOrders);
    const [selectedOption, setSelectedOption] = useState('');

    let totalAmount = 0;
    orders && orders.forEach((item) => (totalAmount += item.totalPrice));
    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    const format = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');

    const dataLineChart = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                fill: true,
                label: 'TOTAL AMOUNT',
                backgroundColor: '#d0f667',
                hoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
                tooltipItems: true,
                borderColor: 'rgb(53, 162, 235)',
            },
        ],
    };
    const optionsLineChart = {
        responsive: true,
        plugins: {
            legend: {},
            title: {
                display: true,
                text: 'Amount Sales Chart',
            },
        },
    };

    const dataCircleChart = {
        labels: ['Out of Stock', 'InStock'],
        datasets: [
            {
                hoverBackgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const optionsSelect = [];
    products && products.map((item) => optionsSelect.push({ value: item._id, label: item.name }));

    const handleSearchProduct = (e) => {
        setSelectedOption(e);
        dispatch(getDetailProduct(e.value));
    };

    useEffect(() => {
        if (userError) {
            dispatch(clearErrors());
            alert.error(userError);
        }

        if (productError) {
            dispatch(clearProductErrors());
            alert.error(productError);
        }
        if (orderError) {
            dispatch(clearOrderErrors());
            alert.error(orderError);
        }

        if (detailsProduct) {
            dispatch(clearProductErrors());
            alert.error(detailsProduct);
        }
        dispatch(adminProducts());
        dispatch(getAllUsers());
        dispatch(getAllOrders());
    }, [dispatch, alert, productError, userError, orderError, detailsProduct]);
    return (
        <>
            {productsLoading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper-admin-page')}>
                    <div>
                        <Sidebar />
                    </div>
                    <div className={cx('container-admin-page')}>
                        <div className={cx('content')}>
                            <div className={cx('total')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('header')}>
                                        <FontAwesomeIcon icon={faCircleDollarToSlot} />
                                        Total sales
                                    </div>
                                    <div className={cx('quantity')}>${format(totalAmount)}</div>
                                </div>
                                <div className={cx('form-group')} onClick={() => navigate('/admin/products')}>
                                    <div className={cx('header')}>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                        Products
                                    </div>
                                    <div className={cx('quantity')}>{products && products.length}</div>
                                </div>
                                <div className={cx('form-group')} onClick={() => navigate('/admin/orders')}>
                                    <div className={cx('header')}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        Orders
                                    </div>
                                    <div className={cx('quantity')}>{orders && orders.length}</div>
                                </div>
                                <div className={cx('form-group')} onClick={() => navigate('/admin/users')}>
                                    <div className={cx('header')}>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                        Users
                                    </div>
                                    <div className={cx('quantity')}>{users && users.length}</div>
                                </div>
                            </div>

                            <div className={cx('chart')}>
                                <div className={cx('line-chart')}>
                                    <Line options={optionsLineChart} data={dataLineChart} />
                                </div>
                                <div className={cx('circle-chart')}>
                                    <Doughnut data={dataCircleChart} />
                                </div>
                            </div>

                            <div className={cx('top-product')}>
                                <div className={cx('search')}>
                                    <div className={cx('title')}>Top Products</div>
                                    <Select
                                        className={cx('search-input')}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 4,
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'PaleTurquoise',
                                                primary: 'DarkSlateBlue',
                                            },
                                        })}
                                        placeholder="Search or choose name product..."
                                        value={selectedOption}
                                        onChange={handleSearchProduct}
                                        options={optionsSelect}
                                    />
                                </div>

                                {product && selectedOption && !loading ? (
                                    <Link to={`/admin/product/${product._id}`} className={cx('detail-product')}>
                                        <img
                                            src={product && product.images ? product.images[0].url : noImage}
                                            className={cx('product-img')}
                                            alt=""
                                        />
                                        <div className={cx('product-info')}>
                                            <div className={cx('product-name')}>{product && product.name}</div>
                                            <div className={cx('product-des')}>
                                                Description : {product && product.description}
                                            </div>
                                            <div className={cx('product-price')}>
                                                Price : ${product && product.price}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminDashboard;
