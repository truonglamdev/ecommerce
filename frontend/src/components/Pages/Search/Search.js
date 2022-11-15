import { useState } from 'react';

import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
function Search() {
    const [keyword, setKeyword] = useState('');
    const history = useNavigate();
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history('/products');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('search-box')} onSubmit={handleSubmitSearch}>
                <input
                    type="text"
                    placeholder="Search a product ..."
                    className={cx('search-input')}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input className={cx('submit-btn')} type="submit" value="Search" />
            </form>
        </div>
    );
}

export default Search;
