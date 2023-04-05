import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeBasket, selectCurrentItemInBasket } from '../redux/slices/basketSlice';

function Cart({ title, imagesUrl, types, typesDough }) {
  const dispatch = useDispatch();
  const [dynamicValueItem, setDynamicValueItem] = React.useState({
    id: types[0].id,
    price: types[0].price,
    type: types[0].title,
    typesDough: typesDough[0],
  });

  const itemBasket = useSelector(selectCurrentItemInBasket(dynamicValueItem.id));

  function updateSelection(i, item) {
    setDynamicValueItem({
      ...dynamicValueItem,
      id: item.id,
      price: item.price,
      type: item.title,
    });
  }

  function handleAddBasket() {
    dispatch(
      addBasket({
        title,
        imagesUrl,
        ...dynamicValueItem,
      })
    );
  }

  function handleRemoveBasket() {
    dispatch(
      removeBasket({
        item: dynamicValueItem,
      })
    );
  }

  return (
    <div className="pizza-block">
      <picture>
        <source
          srcSet={`${imagesUrl.min} 138w,
             ${imagesUrl.middle} 584w,
             ${imagesUrl.max} 760w`}
          sizes="584px"
        />

        <img alt={title} title={title} className="pizza-block__image" src={imagesUrl.middle} />
      </picture>

      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typesDough.map((item, i) => (
            <li
              key={i}
              onClick={() => setDynamicValueItem({ ...dynamicValueItem, typesDough: typesDough[i] })}
              className={item === dynamicValueItem.typesDough ? 'active' : ''}
            >
              {item}
            </li>
          ))}
        </ul>
        <ul>
          {types.map((item, i) => (
            <li
              key={i}
              onClick={() => updateSelection(i, item)}
              className={dynamicValueItem.id === item.id ? 'active' : ''}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {dynamicValueItem.price} ₽</div>

        {itemBasket ? (
          <div className="button button_count button--add">
            <div className="button button__count-item" onClick={handleRemoveBasket}>
              <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.2 2.4C0.537259 2.4 0 1.86274 0 1.2C0 0.537258 0.537259 0 1.2 0H8.8C9.46274 0 10 0.537258 10 1.2C10 1.86274 9.46274 2.4 8.8 2.4H1.2Z"
                  fill="#2C2F39"
                />
              </svg>
            </div>
            <span className="button__count-text">{itemBasket.quantity}</span>
            <div className="button button__count-item" onClick={handleAddBasket}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.89728 6.12676H1.10161C0.493208 6.12676 0 5.63355 0 5.02515C0 4.41675 0.493208 3.92354 1.10161 3.92354H3.89728V1.10272C3.89728 0.493705 4.39099 0 5 0C5.60901 0 6.10272 0.493704 6.10272 1.10272V3.92354H8.89839C9.50679 3.92354 10 4.41675 10 5.02515C10 5.63355 9.50679 6.12676 8.89839 6.12676H6.10272V8.89728C6.10272 9.5063 5.60901 10 5 10C4.39099 10 3.89728 9.5063 3.89728 8.89728V6.12676Z"
                  fill=" #2C2F39"
                />
              </svg>
            </div>
          </div>
        ) : (
          <button className="button button--outline button--add" onClick={handleAddBasket}>
            <span>Купить</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
