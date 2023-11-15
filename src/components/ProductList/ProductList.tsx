import { useAppSelector } from '../../hooks/useAppSelector';
import ProductListElement from '../ProductListElement/ProductListElement';

import style from './ProductList.module.scss';

const ProductList = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет в наличии</p>
      ) : (
        categories.map((category) => (
          <ProductListElement key={category.id} name={category.name} id={category.id} />
        ))
      )}
    </div>
  );
};

export default ProductList;
