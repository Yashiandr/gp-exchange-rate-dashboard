import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import GlobalStyles from './globalStyles';
import { Dashboard } from './components/Dashboard/Dashboard';
import getData from './services/getData'

interface IData {
    date: string;
    month: string;
    indicator: string;
    value: number;
}

const data: IData = await getData('https://65d15239ab7beba3d5e449ae.mockapi.io/rate');

function App() {
  return (
  <Theme preset={presetGpnDefault}>
    <GlobalStyles />
    <Dashboard data={data}/>
  </Theme>
  );
}

export default App;