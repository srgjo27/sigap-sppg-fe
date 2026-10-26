import { Outlet, ScrollRestoration } from 'react-router-dom';

/** App shell for every route. No Navbar/Footer: the current screens (login) don't use them. */
export function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
