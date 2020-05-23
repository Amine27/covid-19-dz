import i18next from 'i18next'
import Chart from 'chart.js'
import datalabels from 'chartjs-plugin-datalabels'
import {
  age, ageConfirmedData, ageDeathsData, confirmed, date, deaths, gender, genderData, provinces, recovered
} from './data.js'
import {
  chartColors, getAverageDailyData, getDailyData, getDataLocalized, getDataPerWilayaName, getDataPerWilayaValue
} from './main.js'

Chart.defaults.global.plugins.datalabels.display = false
Chart.defaults.global.hover.events = ['mousemove', 'mouseout', 'click']

export let statsChart
export let genderChart
export let ageChart
export let dailyChart
export let wilayaChart
export let wilayaEvolutionChart
export let wilayaDailyChart

export function initCharts() {
  if (statsChart) {
    statsChart.destroy()
  }
  if (genderChart) {
    genderChart.destroy()
  }
  if (ageChart) {
    ageChart.destroy()
  }
  if (dailyChart) {
    dailyChart.destroy()
  }
  if (wilayaChart) {
    wilayaChart.destroy()
  }

  statsChart = new Chart($('#statsChart'), {
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
        },
        {
          label: i18next.t('recovered'),
          backgroundColor: chartColors.green,
          borderColor: chartColors.green,
          fill: false,
          borderWidth: 2,
          data: recovered
        },
        {
          label: i18next.t('deaths'),
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          fill: false,
          borderWidth: 2,
          data: deaths
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: 'M/D/YY',
            tooltipFormat: 'll'
          },
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      title: {
        display: true,
        text: i18next.t('cases-evolution')
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  })

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
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: i18next.t('cases-gender')
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      plugins: {
        datalabels: {
          display: true,
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: (value, ctx) => {
            let sum = 0
            const dataArr = ctx.chart.data.datasets[0].data
            dataArr.map((data) => {
              sum += data
            })
            return `${(value * 100 / sum).toFixed(2)}%`
          }
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
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      title: {
        display: true,
        text: i18next.t('cases-age')
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  })

  dailyChart = new Chart($('#dailyChart'), {
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
          data: getAverageDailyData(confirmed, 7)
        },
        {
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          borderWidth: 2,
          data: getDailyData(confirmed)
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          offset: true,
          type: 'time',
          time: {
            parser: 'M/D/YY',
            tooltipFormat: 'll'
          },
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      title: {
        display: true,
        text: i18next.t('daily-cases')
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  })

  wilayaChart = new Chart($('#wilayaChart'), {
    type: 'horizontalBar',
    data: {
      labels: getDataPerWilayaName(provinces, 'confirmed', false),
      datasets: [
        {
          label: i18next.t('confirmed'),
          backgroundColor: chartColors.orange,
          borderColor: chartColors.orange,
          borderWidth: 2,
          data: getDataPerWilayaValue(provinces, 'confirmed', false)
        }
      ]
    },
    options: {
      layout: {
        padding: {
          right: 30
        }
      },
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
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
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      plugins: {
        datalabels: {
          display: true,
          anchor: 'end',
          align:'right'
        }
      }
    }
  })
}

export function initWilayaEvolutionChart(date, confirmed, deaths) {
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
        },
        {
          label: i18next.t('deaths'),
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          fill: false,
          borderWidth: 2,
          data: deaths
        }
      ]
    },
    options: {
      response: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            // parser: 'YYYY-MM-DDTHH:mm:ssZ',
            tooltipFormat: 'll'
          },
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      title: {
        display: true,
        text: i18next.t('cases-evolution')
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  })
}

export function initWilayaDailyChart(date, dataType, data, avg7Data) {
  if (wilayaDailyChart) {
    wilayaDailyChart.destroy()
  }

  let label
  let backgroundColor
  let borderColor

  if (dataType === 'confirmed') {
    label = i18next.t('confirmed')
    backgroundColor = chartColors.orange
    borderColor = chartColors.orange
  } else if (dataType === 'deaths') {
    label = i18next.t(dataType)
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
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          offset: true,
          type: 'time',
          time: {
            // parser: 'YYYY-MM-DDTHH:mm:ssZ',
            tooltipFormat: 'll'
          },
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: chartColors.gridLinesColor
          }
        }]
      },
      title: {
        display: true,
        text: i18next.t('daily-cases')
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  })
}
