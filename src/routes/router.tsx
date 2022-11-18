import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import Home from './Home';
import Currency from './Currency';
import Currencies from './Currencies';

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
        path: '/currencies',
        element: <Currencies />
      },
      {
        path: '/currency/:id',
        element: <Currency />
      }
    ]
  }
]);

export default router;
