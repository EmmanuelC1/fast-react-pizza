import { Outlet } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        {/* Outlet is to render the current nested/child route */}
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
