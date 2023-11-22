import { useAppSelector } from '../../hooks/useAppSelector';
import { ProductListItem } from '../ProductListItem/ProductListItem';
import style from './ProductList.module.scss';

const ProductList = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет в наличии</p>
      ) : (
        categories.map((category, index) => (
          <ProductListItem category={category} index={index} key={category.name} />
        ))
      )}
    </div>
  );
};

export default ProductList;
