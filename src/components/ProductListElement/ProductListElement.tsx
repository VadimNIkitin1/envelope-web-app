import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector.js';
import { ICategory } from '../../store/types.js';

import ProductItem from '../ProductItem/ProductItem.jsx';

import style from './ProductListElement.module.scss';

const ProductListElement: FC<ICategory> = ({ name, id }) => {
  const products = useAppSelector((state) => state.products.products);
  const filterProd = products.filter((prod) => prod.category_id === id);

  return (
    <div className={style.listElement}>
      <h3 id={`${name}`} className={style.categoryName}>
        {name}
      </h3>
      {filterProd === undefined || filterProd.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        filterProd.map((prod) => <ProductItem prod={prod} key={prod.id} />)
      )}
    </div>
  );
};

export default ProductListElement;
