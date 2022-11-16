import * as React from 'react';

import { AppContainer } from 'containers';
import ColorModeContext from './contexts/colorModeContext';

function App() {
  return (
    <ColorModeContext>
      <AppContainer />
    </ColorModeContext>
  );
}

export default App;
