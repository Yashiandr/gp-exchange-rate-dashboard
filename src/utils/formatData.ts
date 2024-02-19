import { IData } from "./DataInterface"

function indicatorBySymbol(symbol: string | null) {
    switch(symbol) {
        case '$':
            return 'Курс доллара'
        case '€':
            return 'Курс евро' 
        case '¥':
            return 'Курс юаня'
        default:
            return ''
    }
}

const findAverage = (data: Array<number>): string => {
    const sum = data.reduce((a, b) => a + b);
    return (sum / data.length).toFixed(1)
}

export function filterDataBySymbol(symbol: string | null, json: any) {
    const indicator = indicatorBySymbol(symbol)

    const data:Map<string, number>  = new Map(json.filter( (data:IData) => data.indicator === indicator )
                            .map((data: IData) => [data.month, data.value]))

    const title: string = `${indicator.toUpperCase()} ${symbol}/₽`

    let result = {
        title: title,
        description: indicator,
        data: data,
        average: findAverage([...data.values()]),
    }

    return result
}