import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { AuthPageTabbed } from '@/pages/auth/ui/AuthPageTabbed';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPageTabbed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
