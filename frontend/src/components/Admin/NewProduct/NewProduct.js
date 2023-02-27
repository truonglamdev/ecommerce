import classNames from 'classnames/bind';
import styles from './NewProduct.module.scss';
import Sidebar from '../Sidebar';
import sampleImage from '~/images/sample-product.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newProduct, resetNewProduct } from '~/actions/productAction';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function NewProduct() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success } = useSelector((state) => state.newProduct);
    const categories = ['Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones'];

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

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

    const handleAddProduct = (e) => {
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

        dispatch(newProduct(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Add product successfully !');
            navigate('/admin/products');
            dispatch(resetNewProduct());
        }
    }, [error, alert, dispatch, success, navigate]);

    // happy new year
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>
            <div className={cx('container')}>
                <div className={cx('add-product-box')}>
                    <div className={cx('title')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>{' '}
                        Add Product
                    </div>
                    <form className={cx('info-form')} encType="multipart/form-data" onSubmit={handleAddProduct}>
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
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <span>Categories </span>
                                <select className={cx('input-group')} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">
                                        Choose Category <span><FontAwesomeIcon icon={faQuestionCircle} /></span>
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

                                    {imagesPreview[0] ? (
                                        <label htmlFor="product-img">
                                            <img src={imagesPreview[0]} className={cx('sample-choose-file')} alt="" />
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
                                        {imagesPreview[1] ? (
                                            <img src={imagesPreview[1]} className={cx('sample-img')} alt="" />
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
                                ></textarea>
                            </div>

                            <button type="submit" className={cx('submit-btn')}>
                                Add product <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
