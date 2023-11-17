import ProductItem from '../ProductItem/ProductItem';

import style from './ProductList.module.scss';

const ProductList = ({ products, categories, cart }) => {
  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет в наличии</p>
      ) : (
        categories.map((category) => (
          <div className={style.listElement} key={category.id}>
            <h3 id={`${category.name}`} className={style.categoryName}>
              {category.name}
            </h3>
            {products === undefined || products.length === 0 ? (
              <p className={style.message}>Нет добавленых элементов</p>
            ) : (
              products
                .filter((prod) => prod.category_id === category.id)
                .map((prod) => (
                  <ProductItem
                    prod={prod}
                    key={prod.id}
                    ifCart={cart.filter((i) => i.id === prod.id)[0]}
                  />
                ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
