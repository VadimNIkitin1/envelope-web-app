import { useAppSelector } from '../../hooks/useAppSelector';
import ProductListElement from '../ProductListElement/ProductListElement';

import style from './ProductList.module.css';

const ProductList = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={style.productList}>
      {categories.map((category) => (
        <ProductListElement
          key={category.id}
          categoryName={category.name_rus}
          categoryId={category.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
