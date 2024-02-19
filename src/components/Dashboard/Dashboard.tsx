import React, { useState } from "react";
import { StyleDashboard } from "./Dashboard.style";
import { ChoiceCurrency } from "../ChoiseCurrency/ChoiseCurrency";
import { filterDataBySymbol } from "../../utils/formatData";

type Item = string
const items: Item[] = ['$', '€', '¥']

interface IFormatData {
  title: string;
  description: string;
  yData: Array<number>;
  xData: Array<string>;
  average: string;
}

export const Dashboard = ({ data }) => {
    const [ valueC, setValueC ] = useState<Item | null>(items[0]);
    const formatData: IFormatData = filterDataBySymbol(valueC, data);

    return (
        <StyleDashboard>
            <div>
                <h1>{formatData.title}</h1>
                <p>Список дат: {formatData.xData.join(', ')}</p>
                <p>Список значений: {formatData.yData.join(', ')}</p>
                <p>Среднее: {formatData.average}</p>
            </div>
            <ChoiceCurrency
            value = {valueC}
            setValue={setValueC}
            items={items}
            />

        </StyleDashboard>
    )
}