import React, { useEffect, useMemo, useState } from "react";
import { StyleDashboard } from "./Dashboard.style";
import { ChoiceCurrency } from "../ChoiseCurrency/ChoiseCurrency";
import { filterDataBySymbol } from "../../utils/formatData";
import { ReactECharts } from "../../Echarts/ReactECharts";
import { IFormatData } from "../../utils/DataInterface";
import { makeOption } from "../../utils/makeOption";

type Item = string


export const Dashboard = ({ data }:any) => {
    const charCurrencies: Item[] = ['$', '€', '¥']

    const [ charPoint, setCharPoint ] = useState<Item | null>(charCurrencies[0]);
    const [ formatData, setFormatData ] = useState<IFormatData | undefined>();
    const option = useMemo<any>(() => makeOption(formatData),[formatData])

    useEffect(() => {
        setFormatData(filterDataBySymbol(charPoint, data))
    }, [charPoint, data])
    option.current = makeOption(formatData)
    return (
          <StyleDashboard>
              <ReactECharts option={option.current} />
              <ChoiceCurrency
              charPoint = {charPoint}
              setCharPoint={setCharPoint}
              charCurrencies={charCurrencies}
              />
          </StyleDashboard>
    )
  }
    