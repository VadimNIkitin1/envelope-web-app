import { useAppSelector } from '../../hooks/useAppSelector';
import ProductListElement from '../ProductListElement/ProductListElement';

import style from './ProductList.module.scss';

const ProductList = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={style.productList}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        categories.map((category) => (
          <ProductListElement key={category.id} name_rus={category.name_rus} id={category.id} />
        ))
      )}
    </div>
  );
};

export default ProductList;
