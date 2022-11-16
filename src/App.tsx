import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root, Home, Data } from 'routes';
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
        path: 'data',
        element: <Data />
      }
    ]
  }
]);

function App() {
  return (
    <ColorModeContext>
      <RouterProvider router={router} />
    </ColorModeContext>
  );
}

export default App;
