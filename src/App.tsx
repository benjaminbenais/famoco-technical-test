import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';
import router from 'routes/router';
import ColorModeContext from './contexts/colorModeContext';

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
