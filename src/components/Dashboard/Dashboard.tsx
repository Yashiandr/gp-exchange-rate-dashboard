import React, { useEffect, useMemo, useState } from "react";
import { StyleDashboard } from "./Dashboard.style";
import { ChoiceCurrency } from "../ChoiseCurrency/ChoiseCurrency";
import { getOptionToChart } from "../../utils/formatData";
import { ReactECharts } from "../../Echarts/ReactECharts";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, selectData } from "../../store/selectors";
import { setCurrency } from "../../store/chartSlice";

type Item = string

export const Dashboard = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectData);
    const charCurrency = useSelector(selectCurrency);
    const charCurrencies: Item[] = ['$', '€', '¥']
    const [ charPoint, setCharPoint ] = useState<Item>(charCurrencies[0]);
    const option = useMemo<any>(() => getOptionToChart(charCurrency, data),[charCurrency,data])
    useEffect(() => {
        dispatch(setCurrency(charPoint))
        option.current = getOptionToChart(charCurrency, data);
    },[charCurrency, data, option, dispatch, charPoint]);
    
    return (
        <StyleDashboard>
            <ReactECharts option={option} />
            <ChoiceCurrency
                charPoint = {charPoint}
                setCharPoint={setCharPoint}
                charCurrencies={charCurrencies}
            />
        </StyleDashboard>
    )
  }
    