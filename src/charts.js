import i18next from 'i18next'
import { Chart, ArcElement, LineElement, BarElement, PointElement, DoughnutController, BarController, LineController, CategoryScale, LinearScale, TimeScale, Legend, Title, Tooltip } from 'chart.js'
import 'chartjs-adapter-moment'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  age, ageConfirmedData, ageDeathsData, confirmed, date, deaths, gender, genderData, provinces, recovered
} from './data.js'
import {
  active, chartColors, getAverageDailyData, getDailyData, getDataLocalized, getDataPerWilayaName, getDataPerWilayaValue
} from './main.js'

Chart.register(LineElement, ArcElement, BarElement, PointElement, DoughnutController, BarController, LineController, CategoryScale, LinearScale, TimeScale, Legend, Title, Tooltip, ChartDataLabels)

Chart.defaults.plugins.datalabels.display = false
Chart.defaults.hover.events = ['mousemove', 'mouseout', 'click']

export let cumulChart
export let genderChart
export let ageChart
export let dailyChart
export let wilayaChart
export let wilayaEvolutionChart
export let wilayaDailyChart

export const initCharts = () => {
  if (genderChart) {
    genderChart.destroy()
  }
  if (ageChart) {
    ageChart.destroy()
  }
  if (wilayaChart) {
    wilayaChart.destroy()
  }

  initDailyChart()
  initCumulChart()

  genderChart = new Chart($('#genderChart'), {
    type: 'doughnut',
    data: {
      labels: getDataLocalized(gender),
      datasets: [
        {
          data: genderData,
          backgroundColor: [
            chartColors.green,
            chartColors.blue
          ],
          borderColor: [
            chartColors.green,
            chartColors.blue
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      animation: {
        animateScale: true,
        animateRotate: true
      },
      plugins: {
        datalabels: {
          display: true,
          textAlign: 'center',
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            const dataArr = ctx.chart.data.datasets[0].data
            const sum = dataArr.reduce((i, curr) => i + curr)
            return `${(value * 100 / sum).toFixed(2)}%`
          }
        },
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: i18next.t('cases-gender')
        }
      }
    }
  })

  ageChart = new Chart($('#ageChart'), {
    type: 'bar',
    data: {
      labels: age,
      datasets: [
        {
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          borderWidth: 2,
          data: ageConfirmedData
        },
        {
          label: i18next.t('deaths'),
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          borderWidth: 2,
          data: ageDeathsData
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          ticks: {
            beginAtZero: true
          },
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: i18next.t('cases-age')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: true
        }
      }
    }
  })

  wilayaChart = new Chart($('#wilayaChart'), {
    type: 'bar',
    data: {
      labels: getDataPerWilayaName(provinces, 'confirmed', false),
      datasets: [
        {
          axis: 'y',
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          borderWidth: 2,
          data: getDataPerWilayaValue(provinces, 'confirmed', false)
        }
      ]
    },
    options: {
      indexAxis: 'y',
      layout: {
        padding: {
          right: 20,
          left: 10
        }
      },
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          ticks: {
            beginAtZero: true
          }
        },
        y: {
          ticks: {
            autoSkip: false,
            crossAlign: 'far'
          },
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      plugins: {
        datalabels: {
          display: true,
          anchor: 'end',
          align: 'right'
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: i18next.t('cases-wilaya')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    }
  })
}

export const initCumulChart = (dataRange = 0) => {
  if (cumulChart) {
    cumulChart.destroy()
  }

  cumulChart = new Chart($('#cumulChart'), {
    type: 'line',
    data: {
      labels: date.slice(dataRange),
      datasets: [
        {
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          fill: false,
          borderWidth: 2,
          data: confirmed.slice(dataRange)
        },
        {
          label: i18next.t('recovered'),
          backgroundColor: chartColors.green,
          borderColor: chartColors.green,
          fill: false,
          borderWidth: 2,
          data: recovered.slice(dataRange)
        },
        {
          label: i18next.t('deaths'),
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          fill: false,
          borderWidth: 2,
          data: deaths.slice(dataRange)
        },
        {
          label: i18next.t('active'),
          backgroundColor: chartColors.blue,
          borderColor: chartColors.blue,
          fill: false,
          borderWidth: 2,
          data: active.slice(dataRange)
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          type: 'time',
          time: {
            parser: 'M/D/YY',
            tooltipFormat: 'll'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        title: {
          display: true,
          text: i18next.t('cases-evolution')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    }
  })
}

export const initDailyChart = (dataType = 'confirmed', dataRange = 0) => {
  if (dailyChart) {
    dailyChart.destroy()
  }

  const days = 7
  const label = i18next.t(dataType)
  let backgroundColor
  let borderColor
  let barData
  let lineData

  if (dataType === 'confirmed') {
    backgroundColor = chartColors.orange
    borderColor = chartColors.orange
    barData = getDailyData(confirmed).slice(dataRange)
    lineData = getAverageDailyData(confirmed, days).slice(dataRange)
  } else if (dataType === 'deaths') {
    backgroundColor = chartColors.red
    borderColor = chartColors.red
    barData = getDailyData(deaths).slice(dataRange)
    lineData = getAverageDailyData(deaths, days).slice(dataRange)
  } else if (dataType === 'recovered') {
    backgroundColor = chartColors.green
    borderColor = chartColors.green
    barData = getDailyData(recovered).slice(dataRange)
    lineData = getAverageDailyData(recovered, days).slice(dataRange)
  } else if (dataType === 'active') {
    backgroundColor = chartColors.blue
    borderColor = chartColors.blue
    barData = getDailyData(active).slice(dataRange)
    lineData = getAverageDailyData(active, days).slice(dataRange)
  }

  dailyChart = new Chart($('#dailyChart'), {
    type: 'bar',
    data: {
      labels: date.slice(dataRange),
      datasets: [
        {
          type: 'line',
          label: i18next.t('7-day-average'),
          backgroundColor: chartColors.purple,
          borderColor: chartColors.purple,
          borderWidth: 2,
          fill: false,
          data: lineData
        },
        {
          label,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          data: barData
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          offset: true,
          type: 'time',
          time: {
            parser: 'M/D/YY',
            tooltipFormat: 'll'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          ticks: {
            beginAtZero: true
          },
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        title: {
          display: true,
          text: i18next.t('daily-cases')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: true
        }
      }
    }
  })
}

export const initWilayaEvolutionChart = (date, confirmed) => {
  if (wilayaEvolutionChart) {
    wilayaEvolutionChart.destroy()
  }

  wilayaEvolutionChart = new Chart($('#wilayaEvolutionChart'), {
    type: 'line',
    data: {
      labels: date,
      datasets: [
        {
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          fill: false,
          borderWidth: 2,
          data: confirmed
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          type: 'time',
          time: {
            // parser: 'YYYY-MM-DDTHH:mm:ssZ',
            tooltipFormat: 'll'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        title: {
          display: true,
          text: i18next.t('cases-evolution')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    }
  })
}

export const initWilayaDailyChart = (date, dataType, data, avg7Data) => {
  if (wilayaDailyChart) {
    wilayaDailyChart.destroy()
  }

  const label = i18next.t(dataType)
  let backgroundColor
  let borderColor

  if (dataType === 'confirmed') {
    backgroundColor = chartColors.orange
    borderColor = chartColors.orange
  } else if (dataType === 'deaths') {
    backgroundColor = chartColors.red
    borderColor = chartColors.red
  }

  wilayaDailyChart = new Chart($('#wilayaDailyChart'), {
    type: 'bar',
    data: {
      labels: date,
      datasets: [
        {
          type: 'line',
          label: i18next.t('7-day-average'),
          backgroundColor: chartColors.purple,
          borderColor: chartColors.purple,
          borderWidth: 2,
          fill: false,
          data: avg7Data
        },
        {
          label,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          data
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          offset: true,
          type: 'time',
          time: {
            // parser: 'YYYY-MM-DDTHH:mm:ssZ',
            tooltipFormat: 'll'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          ticks: {
            beginAtZero: true
          },
          grid: {
            color: chartColors.gridLinesColor
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        title: {
          display: true,
          text: i18next.t('daily-cases')
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: true
        }
      }
    }
  })
}
