import { useAppSelector } from '../../hooks/useAppSelector.js';

import ProductItem from '../ProductItem/ProductItem.jsx';

import style from './ProductListElement.module.css';

const ProductListElement = ({ categoryName, categoryId }) => {
  const products = useAppSelector((state) => state.products.products);
  const filterProd = products.filter((prod) => prod.category === categoryId);

  return (
    <div className={style.listElement}>
      <h3 id={`${categoryName}`} className={style.categoryName}>
        {categoryName}
      </h3>
      {filterProd.map((prod) => (
        <ProductItem prod={prod} key={prod.id} />
      ))}
    </div>
  );
};

export default ProductListElement;
