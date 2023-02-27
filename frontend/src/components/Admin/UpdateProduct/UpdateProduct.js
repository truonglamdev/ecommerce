import classNames from 'classnames/bind';
import styles from '../NewProduct/NewProduct.module.scss';
import Sidebar from '../Sidebar';
import sampleImage from '~/images/sample-product.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getDetailProduct, resetUpdate, updateProduct } from '~/actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '~/components/layout/Loader';

const cx = classNames.bind(styles);
function UpdateProduct() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { error, product } = useSelector((state) => state.productDetails);
    const { error: updateProductError, isUpdate, loading } = useSelector((state) => state.updateProduct);

    const categories = ['Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones'];

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const productId = params.id;
    const handleOnchangeInputFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((prev) => [...prev, reader.result]);
                    setImagesPreview((prev) => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('Stock', Stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });

        dispatch(updateProduct(productId, myForm));
    };

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getDetailProduct(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            product.images && product.images.length > 0 ? setOldImages(product.images) : setOldImages([]);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateProductError) {
            alert.error(updateProductError);
            dispatch(clearErrors());
        }

        if (isUpdate) {
            alert.success('Update product successfully !');
            navigate('/admin/products');
            dispatch(resetUpdate());
        }
    }, [error, alert, dispatch, navigate, productId, product, isUpdate, updateProductError]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('add-product-box')}>
                            <div className={cx('title')}>
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                Update Product
                            </div>
                            <form
                                className={cx('info-form')}
                                encType="multipart/form-data"
                                onSubmit={handleUpdateProduct}
                            >
                                <div className={cx('content-left')}>
                                    <div className={cx('form-group')}>
                                        <span>
                                            Product Name <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                        <input
                                            className={cx('input-group')}
                                            type="text"
                                            required
                                            placeholder="Do not exceed 20 characters When entering the product name"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                    </div>
                                    <div className={cx('form-group')}>
                                        <span>
                                            Price <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                        <input
                                            className={cx('input-group')}
                                            type="number"
                                            required
                                            placeholder="Price"
                                            onChange={(e) => setPrice(e.target.value)}
                                            value={price}
                                        />
                                    </div>
                                    <div className={cx('form-group')}>
                                        <span>
                                            Stock Product <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                        <input
                                            className={cx('input-group')}
                                            type="number"
                                            required
                                            onChange={(e) => setStock(e.target.value)}
                                            value={Stock}
                                        />
                                    </div>
                                    <div className={cx('form-group')}>
                                        <span>Categories </span>
                                        <select
                                            className={cx('input-group')}
                                            onChange={(e) => setCategory(e.target.value)}
                                            value={category}
                                        >
                                            <option value="">
                                                <label>
                                                    Choose Category
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                </label>
                                            </option>
                                            {categories.map((cate) => (
                                                <option key={cate} value={cate}>
                                                    {cate}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={cx('content-right')}>
                                    <div className={cx('form-group')}>
                                        <span>
                                            Product Images <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                        <div className={cx('img-box')}>
                                            <img src={sampleImage} className={cx('sample-img')} alt="" />

                                            {oldImages && oldImages[0] ? (
                                                <label htmlFor="product-img">
                                                    <img
                                                        src={
                                                            imagesPreview && imagesPreview[0]
                                                                ? imagesPreview[0]
                                                                : oldImages[0].url
                                                        }
                                                        className={cx('sample-choose-file')}
                                                        alt=""
                                                    />
                                                </label>
                                            ) : (
                                                <label htmlFor="product-img" className={cx('choose-file')}>
                                                    <p>
                                                        Drop you images , here or select <span>click to browse</span>
                                                    </p>
                                                </label>
                                            )}

                                            <input
                                                className={cx('input-group')}
                                                type="file"
                                                multiple
                                                id="product-img"
                                                placeholder="Drop you images , here"
                                                onChange={handleOnchangeInputFiles}
                                                hidden
                                            />
                                            <img alt="" />
                                            <div>
                                                {oldImages && oldImages[1] ? (
                                                    <img
                                                        src={
                                                            imagesPreview && imagesPreview[1]
                                                                ? imagesPreview[1]
                                                                : oldImages[1].url
                                                        }
                                                        className={cx('sample-choose-file')}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <label htmlFor="product-img" className={cx('choose-file')}>
                                                        <p>Preview Image</p>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('form-group')}>
                                        <span>
                                            Description <FontAwesomeIcon icon={faQuestionCircle} />
                                        </span>
                                        <textarea
                                            className={cx('input-group')}
                                            placeholder="Product Description"
                                            rows={4}
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className={cx('submit-btn')}>
                                        Update <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateProduct;
