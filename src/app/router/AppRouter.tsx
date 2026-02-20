import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { AuthPageTabbed } from '@/pages/auth/ui/AuthPageTabbed';
import { CartPage } from '@/pages/cart';
import { CategoryPage } from '@/pages/category';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPageTabbed />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
