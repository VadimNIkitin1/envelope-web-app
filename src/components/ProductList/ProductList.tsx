import { ProductListItem } from '../ProductListItem/ProductListItem';
import style from './ProductList.module.scss';

const ProductList = ({ products, categories, cart }) => {
  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет в наличии</p>
      ) : (
        categories.map((category, index) => (
          <ProductListItem
            cart={cart}
            products={products}
            category={category}
            index={index}
            key={category.name}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
