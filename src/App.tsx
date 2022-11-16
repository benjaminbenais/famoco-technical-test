import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from 'routes';
import ColorModeContext from './contexts/colorModeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
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
