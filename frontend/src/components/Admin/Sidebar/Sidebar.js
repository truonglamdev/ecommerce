import classNames from 'classnames/bind';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import logo from '~/images/logo.png';
import { TreeItem, TreeView } from '@material-ui/lab';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('link')} to="/">
                <img src={logo} alt="logo" className={cx('logo-img')} />
            </Link>
            <Link className={cx('link')} to="/admin/dashboard">
                <div className={cx('form-group')}>
                    <span className={cx('icon')}>
                        <DashboardIcon />
                    </span>
                    <span>Dashboard</span>
                </div>
            </Link>
            <div className={cx('link')}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
                    <TreeItem nodeId="1" label="Products">
                        <Link className={cx('link')} to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link className={cx('link')} to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>

            <Link className={cx('link')} to="/admin/orders">
                <div className={cx('form-group')}>
                    <span className={cx('icon')}>
                        <ListAltIcon />
                    </span>
                    <span>Orders</span>
                </div>
            </Link>
            <Link className={cx('link')} to="/admin/users">
                <div className={cx('form-group')}>
                    <span className={cx('icon')}>
                        <PeopleIcon />
                    </span>
                    <span>Users</span>
                </div>
            </Link>
            <Link className={cx('link')} to="/admin/reviews">
                <div className={cx('form-group')}>
                    <span className={cx('icon')}>
                        <RateReviewIcon />
                    </span>
                    <span>Reviews</span>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
