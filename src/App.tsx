import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import GlobalStyles from './Echarts/globalStyles';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
  <Theme preset={presetGpnDefault}>
    <GlobalStyles />
    <Dashboard />
  </Theme>
  );
}

export default App;