import Sidebar from '~/components/Admin/Sidebar';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '~/actions/userAction';
import { getAllOrders } from '~/actions/orderAction';
import { adminProducts } from '~/actions/productAction';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);
const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '',
        },
    },
};
const cx = classNames.bind(styles);
function Dashboard() {
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.adminUsers);
    const { products } = useSelector((state) => state.adminProducts);
    const { orders } = useSelector((state) => state.adminOrders);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'InStock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    useEffect(() => {
        dispatch(adminProducts());
        dispatch(getAllUsers());
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Dashboard</h2>
                <div className={cx('summary-box')}>
                    <div>
                        <div className={cx('form-group', 'total-amount')}>
                            <span>Total Amount</span>
                            <p>{`${Math.floor(totalAmount)} $`}</p>
                        </div>
                    </div>
                    <div className={cx('summary-box-detail')}>
                        <Link className={cx('link')} to="/admin/orders">
                            <div className={cx('form-group')}>
                                <span>Orders</span>
                                <p>{orders && orders.length}</p>
                            </div>
                        </Link>
                        <Link className={cx('link')} to="/admin/users">
                            <div className={cx('form-group')}>
                                <span>Users</span>
                                <p>{users && users.length}</p>
                            </div>
                        </Link>
                        <Link className={cx('link')} to="/admin/reviews">
                            <div className={cx('form-group')}>
                                <span>Products</span>
                                <p>{products && products.length}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={cx('line-chart')}>
                    <Line options={options} data={lineState} />
                </div>
                <div className={cx('doughnut-chart')}>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
