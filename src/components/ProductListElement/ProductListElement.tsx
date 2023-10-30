import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector.js';
import { ICategory } from '../../store/types.js';

import ProductItem from '../ProductItem/ProductItem.jsx';

import style from './ProductListElement.module.scss';

const ProductListElement: FC<ICategory> = ({ name_rus, id }) => {
  const products = useAppSelector((state) => state.products.products);
  const filterProd = products.filter((prod) => prod.category_id === id);

  return (
    <div className={style.listElement}>
      <h3 id={`${name_rus}`} className={style.categoryName}>
        {name_rus}
      </h3>
      {filterProd.map((prod) => (
        <ProductItem prod={prod} key={prod.id} />
      ))}
    </div>
  );
};

export default ProductListElement;
