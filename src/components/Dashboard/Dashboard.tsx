import React, { useEffect, useRef, useState } from "react";
import { StyleDashboard } from "./Dashboard.style";
import { ChoiceCurrency } from "../ChoiseCurrency/ChoiseCurrency";
import { filterDataBySymbol } from "../../utils/formatData";
import { ReactECharts } from "../../Echarts/ReactECharts";
import { IFormatData } from "../../utils/DataInterface";
import { makeOption } from "../../utils/makeOption";

type Item = string


export const Dashboard = ({ data }:any) => {
    const items: Item[] = ['$', '€', '¥']
    
    const [ valueC, setValueC ] = useState<Item | null>(items[0]);
    const [ formatData, setFormatData ] = useState<IFormatData | undefined>();
    let option = useRef<any>(makeOption(formatData))

    useEffect(() => {
        setFormatData(filterDataBySymbol(valueC, data))
    }, [valueC, data])
    option.current = makeOption(formatData)
    return (
          <StyleDashboard>
              <ReactECharts option={option.current} />
              <ChoiceCurrency
              value = {valueC}
              setValue={setValueC}
              items={items}
              />
          </StyleDashboard>
    )
  }
    