import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Root, Home, Coins, CoinDetails } from 'routes';
import store from 'store';
import ColorModeContext from './contexts/colorModeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'coins',
        element: <Coins />
      },
      {
        path: 'coins/:id',
        element: <CoinDetails />
      }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <ColorModeContext>
        <RouterProvider router={router} />
      </ColorModeContext>
    </Provider>
  );
}

export default App;
