import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartSlice';

const store = configureStore({
    reducer: chartReducer,
});

export default store