import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Select from 'react-select';
import { Box, Modal, Rating, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ListReview.module.scss';
import Sidebar from '../Sidebar';
import { adminProducts, clearErrors, deleteReview, getAllReviews, resetDeleteReview } from '~/actions/productAction';
import Loader from '~/components/layout/Loader';
import InfoUserReview from './InfoUserReview';

const cx = classNames.bind(styles);
function ListReview() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { products, error, loading } = useSelector((state) => state.adminProducts);
    const { error: reviewError, isDeleted } = useSelector((state) => state.review);
    const {
        error: getAllReviewError,
        loading: getAllReviewLoading,
        reviews,
    } = useSelector((state) => state.productReviews);
    const [selectedOption, setSelectedOption] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [open, setOpen] = useState(false);
    const [reviewId, setReviewId] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        {
            field: 'product',
            headerName: 'Product',
        },
        { field: 'review', headerName: 'Review' },

        {
            field: 'rating',
            headerName: 'Rating',
        },

        {
            field: 'actions',
            headerName: 'Actions',
        },
    ];

    //custom data
    const options = [];
    products && products.map((item) => options.push({ value: item._id, label: item.name }));

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                rating: item.rating,
                userId: item.user,
                id: item._id,
                comment: item.comment,
            });
        });

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth > 600 ? 400 : 280,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '6px',
        boxShadow: 24,
        p: 4,
    };

    const handleSearch = (e) => {
        setSelectedOption(e);
        if (e.value) {
            dispatch(getAllReviews(e.value));
            setNameProduct(e.label);
        }
    };

    const handleClickBtnDelete = (id) => {
        handleOpen();
        setReviewId(id);
    };

    const handleDeleteReview = () => {
        handleClose();
        if (reviewId && selectedOption) {
            dispatch(deleteReview(reviewId, selectedOption.value));
        }
    };

    useEffect(() => {
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Deleted Review Successfully');
            dispatch(resetDeleteReview());
            navigate('/admin/reviews');
            if (selectedOption) {
                dispatch(getAllReviews(selectedOption.value));
            }
        }
        if (getAllReviewError) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(adminProducts());
    }, [dispatch, error, alert, getAllReviewError, isDeleted, reviewError, navigate, selectedOption]);

    return (
        <div className={cx('wrapper-admin-page')}>
            <div>
                <Sidebar />
            </div>
            <div className={cx('container-admin-page')}>
                {loading ? (
                    <Loader />
                ) : (
                    <div className={cx('content')}>
                        <div className={cx('title')}>Review {'&&'} Rating</div>
                        <div className={cx('search')}>
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
                                placeholder="Choose product..."
                                value={selectedOption}
                                onChange={handleSearch}
                                options={options}
                            />
                        </div>

                        {getAllReviewLoading ? (
                            <div></div>
                        ) : (
                            <div className={cx('all-review')}>
                                {reviews && reviews.length === 0 ? (
                                    <div className={cx('no-review')}>
                                        <div>There are no reviews yet!!</div>
                                        <FontAwesomeIcon icon={faFaceSadTear} className={cx('no-review-icon')} />
                                    </div>
                                ) : (
                                    <table className={cx('responsive-table')}>
                                        <caption>All Review</caption>
                                        <thead>
                                            <tr>
                                                {columns &&
                                                    columns.map((column, index) => (
                                                        <th key={index} scope="col">
                                                            {column.headerName}
                                                        </th>
                                                    ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows &&
                                                rows.map((review) => (
                                                    <tr key={review.id}>
                                                        <th scope="row">{nameProduct}</th>
                                                        <td data-title="Comment">
                                                            {<InfoUserReview review={review} />}
                                                        </td>
                                                        <td data-title="Rating">
                                                            {
                                                                <div>
                                                                    <Rating
                                                                        name="size-small"
                                                                        readOnly={true}
                                                                        precision={0.5}
                                                                        size="small"
                                                                        value={review.rating}
                                                                    />
                                                                </div>
                                                            }
                                                        </td>

                                                        <td data-title="Action" data-type="currency">
                                                            <div className={cx('action-button')}>
                                                                <div className={cx('action-button')}>
                                                                    <button
                                                                        className={cx('delete-button', 'button')}
                                                                        onClick={() => handleClickBtnDelete(review.id)}
                                                                    >
                                                                        <span className={cx('active-text')}>
                                                                            delete
                                                                        </span>
                                                                        <FontAwesomeIcon
                                                                            className={cx('active-icon')}
                                                                            icon={faTrash}
                                                                        />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this review?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={cx('wrap-button')}>
                            <button className={cx('button', 'delete-button')} onClick={handleDeleteReview}>
                                Delete
                            </button>
                            <button className={cx('button', 'cancel-button')} onClick={handleClose}>
                                Cancel
                            </button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ListReview;
