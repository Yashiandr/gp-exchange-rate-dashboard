import { setData } from "./chartSlice";

export const fetchData = () => async (dispatch:any):Promise<any> => {
    const response = await fetch('https://65d15239ab7beba3d5e449ae.mockapi.io/rate');
    const result = await response.json();

    dispatch(setData(await result));
}