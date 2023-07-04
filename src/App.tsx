import './scss/app.scss';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

const Basket = React.lazy(() => import(/* webpackChunkName: "Basket" */'./pages/Basket'));

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/basket/" element={
            <Suspense fallback={<div className="loading">{'Загрузка...'}</div>}>
              <Basket />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
