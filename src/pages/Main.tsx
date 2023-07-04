import { Categories, Product, SkeletonCart, Sort } from '../components';
import React, { useEffect, useRef } from 'react';
import { countSkeleton, filterInitialState } from '../constants/constants';
import { fetchProducts, selectProducts } from '../redux/reducers/productsSlice';
import { selectFilter, setFilters } from '../redux/reducers/filterSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { TFilterInitialState } from '../types/filter';
import qs from 'qs';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

function Main():JSX.Element {
  const dispatch = useAppDispatch();
  const { itemsProducts, statusFetchProducts } = useSelector(selectProducts);
  const filter = useSelector(selectFilter);
  const searchParams = useLocation().search;
  const navigate = useNavigate();
  const isGetRequest = useRef<boolean>(true);

  useEffect(() => {
    if (isGetRequest.current) {
      const qsParamsUnique: TFilterInitialState = {};

      (Object.keys(filterInitialState) as (keyof TFilterInitialState)[]).forEach(keyFilterInitialState => {
        (Object.keys(filter) as (keyof TFilterInitialState)[]).forEach(keyFilter => {
          if (keyFilterInitialState === keyFilter
            && filterInitialState[keyFilterInitialState] !== filter[keyFilter]) {
            qsParamsUnique[keyFilter] = filter[keyFilter] as never;
          }
        });
      });

      navigate(`?${qs.stringify(qsParamsUnique)}`);
      void dispatch(fetchProducts(qs.stringify(filter)));
    }

    isGetRequest.current = true;
  }, [filter]);

  useEffect(() => {
    if (searchParams) {
      const filterObj: TFilterInitialState = qs.parse(searchParams.replace('?', ''));

      dispatch(setFilters(filterObj));
    } else {
      dispatch(setFilters(filterInitialState));
    }
  }, [searchParams]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      {statusFetchProducts === 'error'
        ? <h2 className="content__title">{'Произошла ошибка'}</h2>
        : <>
          <h2 className="content__title">{'Все пиццы'}</h2>
          <div className="content__items">
            {statusFetchProducts !== 'loading'
              ? itemsProducts.map(item => <Product {...item} key={item.types[0].id} />)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              : [...new Array(countSkeleton)].map((item, i) => <SkeletonCart key={i} />)}
          </div>
        </>
      }
    </div>
  );
}

export default Main;
