import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';

// Creating the Browser Route, AppLayout as the parent and having all the other routes, nested as children
// This way, we can always have the Header, main, and CartOverview displayed (see AppLayout.jsx)
// '<main>' content will be one of the children routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction, // from UpdateOrder.jsx fetcherForm (making order a priority after order has been placed)
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
