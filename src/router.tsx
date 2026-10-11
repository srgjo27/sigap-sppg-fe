import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
        // TODO: Tambahkan route baru di sini
    ],
  },
]);
