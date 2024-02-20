import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    data: '',
    currency: '$',
};

const chartSlice: any = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {
    setCurrency,
    setData,
} = chartSlice.actions;

export default chartSlice.reducer