import { useAppSelector } from '../../hooks/useAppSelector';
import ProductItem from '../ProductItem/ProductItem';
import { ProductListItem } from '../ProductListItem/ProductListItem';
import style from './ProductList.module.scss';

const ProductList = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const products = useAppSelector((state) => state.products.products);
  const cart = useAppSelector((state) => state.cart.cart_items);

  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет в наличии</p>
      ) : (
        <>
          <h3 id={`Популярное`} className={style.categoryName}>
            Популярное
          </h3>
          {products
            .filter((product) => product.popular === true)
            .filter((prod) => prod.dinein === true)
            .filter((prod) => prod.takeaway === true)
            .filter((prod) => prod.delivery === true)
            .map((prod) => (
              <ProductItem
                prod={prod}
                key={prod.id}
                ifCart={cart.filter((i) => i.id === prod.id)[0]}
              />
            ))}
          {categories.map((category, index) => (
            <ProductListItem category={category} index={index} key={category.name} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductList;
