import { IFormatData } from "./DataInterface"
import { tooltipStyle } from "./tooltip.style"

export function  makeOption(settings: IFormatData | undefined){
  if (settings === undefined) {
    return {}
  }
  
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
          right: 20,
          bottom: 230,
          style: {
            text: 'Среднее за период',
            font: '16px Inter',
            fill: '#667985'
          }
        },
        {
          type: 'text',
          right: 60,
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