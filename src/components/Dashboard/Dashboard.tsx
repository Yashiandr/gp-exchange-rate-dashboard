import React, { useState } from "react";
import { StyleDashboard } from "./Dashboard.style";
import { ChoiceCurrency } from "../ChoiseCurrency/ChoiseCurrency";

type Item = string
const items: Item[] = ['$', '€', '¥']

export const Dashboard = () => {
    const [ valueC, setValueC ] = useState<Item | null>(items[0])

    return (
        <StyleDashboard>
            <ChoiceCurrency
            value = {valueC}
            setValue={setValueC}
            items={items}
            />
        </StyleDashboard>
    )
}