import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import Home from './Home';
import CoinDetails from './CoinDetails';
import Coins from './Coins';

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

export default router;
