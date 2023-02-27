import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table() {
    const columns = [
        {
            field: 'id',
            headerName: 'Film Title',
        },
        {
            field: 'name',
            headerName: 'Released',
        },
        {
            field: 'stock',
            headerName: 'Studio',
        },
        {
            field: 'product',
            headerName: 'Film Title',
        },
        {
            field: 'action',
            headerName: 'Film Title',
        },
        {
            field: 'film',
            headerName: 'Film Title',
        },
        {
            field: 'title',
            headerName: 'Film Title',
        },
    ];

    const fieldName = ['id', 'name', 'stock', 'product', 'action', 'film', 'title'];

    const rows = [
        {
            id: '112818928801',
            name: 'Nguyen Truong Lam',
            stock: 10,
            product: 'smartphones',
            action: 'delete',
            film: 'NBN',
            title: 'ok',
        },
        {
            id: '112818928801',
            name: 'Nguyen Truong Lam',
            stock: 10,
            product: 'smartphones',
            action: 'delete',
            film: 'NBN',
            title: 'ok',
        },
    ];
    return (
        <div>
            <table className={cx('responsive-table')}>
                <caption>Top 10 Grossing Animated Films of All Time</caption>
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
                        rows.map((row, index) => {
                            const list = row;
                            return (
                                <tr key={index}>
                                    {fieldName &&
                                        fieldName.map((item, i) => {
                                            // console.log(key);
                                            let value = item;
                                            console.log(list.value);
                                            console.log(item);
                                            console.log(value, i);
                                            return (
                                                <>
                                                    <th scope="row">{}</th>
                                                    <th scope="row">{row.name}</th>
                                                    <th scope="row">{row.stock}</th>
                                                </>
                                            );
                                        })}
                                </tr>
                            );
                        })}
                    <tr>
                        <th scope="row">Toy Story 3</th>
                        <td data-title="Released">2010</td>
                        <td data-title="Studio">Disney Pixar</td>
                        <td data-title="Worldwide Gross" data-type="currency">
                            $1,063,171,911
                        </td>
                        <td data-title="Domestic Gross" data-type="currency">
                            $415,004,880
                        </td>
                        <td data-title="Foreign Gross" data-type="currency">
                            $648,167,031
                        </td>
                        <td data-title="Budget" data-type="currency">
                            $200,000,000
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Toy Story 3</th>
                        <td data-title="Released">2010</td>
                        <td data-title="Studio">Disney Pixar</td>
                        <td data-title="Worldwide Gross" data-type="currency">
                            $1,063,171,911
                        </td>
                        <td data-title="Domestic Gross" data-type="currency">
                            $415,004,880
                        </td>
                        <td data-title="Foreign Gross" data-type="currency">
                            $648,167,031
                        </td>
                        <td data-title="Budget" data-type="currency">
                            $200,000,000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;
