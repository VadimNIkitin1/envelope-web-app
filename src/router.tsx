import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';

import FormPage from './pages/FormPage/FormPage';
import ProductPage from './pages/ProductPage/ProductPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/:schema/:store_id/" element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path={'/:schema/:store_id/products/:id'} element={<ProductPage />} />
      <Route path={'form'} element={<FormPage />} errorElement={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
