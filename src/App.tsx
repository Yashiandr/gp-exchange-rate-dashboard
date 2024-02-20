import React, { useEffect } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import GlobalStyles from './globalStyles';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from './store/selectors';
import { fetchData } from './store/thunk';


function App() {
  const dispatch: any = useDispatch();
  const data = useSelector(selectData)

  useEffect(() => {
    dispatch(fetchData());
  },[dispatch])

  if (data === '') {
    return ''
  }

  return (
  <Theme preset={presetGpnDefault}>
    <GlobalStyles />
    <Dashboard/>
  </Theme>
  );
}

export default App;