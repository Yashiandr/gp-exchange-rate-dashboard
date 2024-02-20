import { IData } from "./DataInterface"
import { IFormatData } from "./DataInterface"
import { tooltipStyle } from "./tooltip.style"

function replacer(_: any, value: any) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
}

function reviver(_: any, value: any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

const findAverage = (data: Array<number>): string => {
    const sum = data.reduce((a, b) => a + b);
    return (sum / data.length).toFixed(1)
}

function filterDataBySymbol(charPoint: string | null, indicator: string, json: any) {
    const data:Map<string, number>  = new Map(json.filter( (data:IData) => data.indicator === indicator )
                            .map((data: IData) => [data.month, data.value]))

    const title: string = `${indicator.toUpperCase()} ${charPoint}/₽`
    let result = {
        title: title,
        description: indicator,
        data: data,
        average: findAverage([...data.values()]),
    }

    console.log(result);
    return result
}


function makeOption(settings: IFormatData){
  const option = {
    tooltip: {
      trigger: 'axis',
      padding: 0,
      formatter: function(params: any){
        return `
          <style>
            ${tooltipStyle}
          </style>
          <div class="tooltip">
            <h4 style="">${params[0].axisValue}</h4>
            <div>
              <span style="margin-right: 2.4375rem;">
                ${params[0].marker}
                <span style="color: #667985; margin-left: .15rem;">${params[0].seriesName}</span>
              </span>
              <span style="font-weight: 700;">${params[0].value}₽</span>
            </div>
          </div>
        `
      },
    },
    grid: {
      left: '5%',
      width:'80%',
    },
    title: {
      text: settings.title,
      textStyle: {
          color: '#002033',
          fontFamily: 'Inter',
          fontSize: '20px',
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...settings.data.keys()],
      tooltip:{
        textStyle:{
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      type: 'value',
      max: (value: any) => value.max + 5,
      min: (value: any) => value.min - 5,
    },
    series: [
      {
        data: [...settings.data.values()],
        name: settings.description,
        symbol: 'none',
        smooth: 0.15,
        type: 'line',
        color: "#F38B00",
        tooltip: {
          valueFormatter: (value: number): string => value + '₽'
        }
      }
    ],
    graphic: {
      elements: [
        {
          type: 'text',
          right: 30,
          bottom: 230,
          style: {
            text: 'Среднее за период',
            font: '16px Inter',
            fill: '#667985'
          }
        },
        {
          type: 'text',
          left: 1040,
          bottom: 160,
          style: {
            text: settings.average,
            font: '48px Inter',
            fill: '#F38B00'
          }
        },
        {
          type: 'text',
          right: 30,
          bottom: 165,
          style: {
            text: '₽',
            font: '20px Inter',
            fill: '#667985'
          }
        }
      ]
    }
  }
    return option
}

export function getOptionToChart(charPoint: string | null, data: any) {
    if (charPoint === '') {
        return
    }
    let result
    switch(charPoint) {
        case '$':
            if (localStorage.getItem('dollar') !== null) {
                return makeOption(JSON.parse(localStorage.getItem('dollar') || '{}', reviver));
            }
            result = filterDataBySymbol(charPoint, 'Курс доллара', data);
            localStorage.setItem('dollar', JSON.stringify(result, replacer));
            return makeOption(result);
        case '€':
            if (localStorage.getItem('euro') !== null) {
                return makeOption(JSON.parse(localStorage.getItem('euro') || '{}', reviver));
            }
            result = filterDataBySymbol(charPoint, 'Курс евро', data);
            localStorage.setItem('euro', JSON.stringify(result, replacer));
            return makeOption(result);
        case '¥':
            if (localStorage.getItem('yuan') !== null) {
                return makeOption(JSON.parse(localStorage.getItem('yuan') || '{}', reviver));
            }
            result = filterDataBySymbol(charPoint, 'Курс юаня', data);
            localStorage.setItem('yuan', JSON.stringify(result, replacer));
            return makeOption(result);
        default:
            return '';
    }
}