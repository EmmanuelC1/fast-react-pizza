import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {isLoading && <Loader />}
          {/* Outlet is to render the current nested/child route */}
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
