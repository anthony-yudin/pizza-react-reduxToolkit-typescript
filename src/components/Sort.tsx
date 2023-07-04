import React, { useEffect, useState } from 'react';
import { selectFilter, setSort } from '../redux/reducers/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TSortAll } from '../types/filter';

export const sortData: TSortAll[] = [
  {
    title: 'Сначала недорогие',
    data: {
      sortBy: 'priceDefault',
      order: 'asc',
    },
  },
  {
    title: 'Сначала дорогие',
    data: {
      sortBy: 'priceDefault',
      order: 'desc',
    },
  },
  {
    title: 'Сначала популярные',
    data: {
      sortBy: 'rating',
      order: 'asc',
    },
  },
];

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const { sortBy, order } = useSelector(selectFilter);
  const [itemActive, setItemActive] = useState<TSortAll>();
  const handleSetSort = React.useCallback((i: number) => {
    console.log(sortData[i].data);
    dispatch(setSort(sortData[i].data));
  }, []);

  useEffect(() => {
    const active = sortData.find(item => item?.data?.sortBy === sortBy && item?.data?.order === order);

    if (active) {
      setItemActive(active);
    }
  }, [sortBy, order]);

  return (
    <div className="sort">
      <div className="sort__label">
        <b>{'Сортировка:'}</b>
        <span className="sort__label-text">
          {itemActive?.title}
          <div className="sort__popup">
            <ul className="sort__item-list">
              {sortData.map((item, i) =>
                <li
                  key={i}
                  onClick={() => handleSetSort(i)}
                  className={item?.data?.sortBy === sortBy && item?.data?.order === order ? 'sort__item sort__item_active' : 'sort__item'}
                >
                  {item.title}
                </li>,
              )}
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Sort;
