import { createBrowserRouter, redirect } from 'react-router-dom';

import { hasAuthToken } from '@/api/auth/helpers';
import { AppLayout } from '@/components/layout/AppLayout';
import { RootLayout } from '@/components/layout/RootLayout';
import { AppSidebar } from '@/components/sections/app/AppSidebar';
import { ROUTES } from '@/constants/routes';
import LoginPage from '@/pages/LoginPage';
import UsersPage from '@/pages/UsersPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      {
        // Areas requiring a login: redirect visitors who do not have a token to the login page.
        loader: () => (hasAuthToken() ? null : redirect(ROUTES.LOGIN)),
        element: <AppLayout sidebar={<AppSidebar />} />,
        children: [{ path: ROUTES.USERS, element: <UsersPage /> }],
      },
    ],
  },
]);
