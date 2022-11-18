import { createBrowserRouter, Navigate } from 'react-router-dom';

import Root from './Root';
import Currency from './Currency';
import Currencies from './Currencies';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate to="/currencies" replace />
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
