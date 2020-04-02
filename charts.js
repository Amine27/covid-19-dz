const statsChart = new Chart($('#statsChart'), {
  type: 'line',
  data: {
    labels: date,
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: chartColors.orange,
        borderColor: chartColors.orange,
        fill: false,
        borderWidth: 2,
        data: confirmed
      },
      {
        label: 'Recovered',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        fill: false,
        borderWidth: 2,
        data: recovered
      },
      {
        label: 'Deaths',
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
      }]
    },
    title: {
      display: true,
      text: 'Cases evolution'
    },
    elements: {
      point: {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  }
})

const genderChart = new Chart($('#genderChart'), {
  type: 'doughnut',
  data: {
    labels: gender,
    datasets: [
      {
        data: genderData,
        backgroundColor: [
          chartColors.green,
          chartColors.blue
        ]
      }
    ]
  },
  options: {
    response: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Cases by gender'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
})

const ageChart = new Chart($('#ageChart'), {
  type: 'bar',
  data: {
    labels: age,
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: [
	  chartColors.red,
	  chartColors.orange,
	  chartColors.yellow,
	  chartColors.green,
	  chartColors.blue,
	  chartColors.purple,
	  chartColors.grey,
          chartColors.pink
	],
        borderColor: [
	  chartColors.red,
	  chartColors.orange,
	  chartColors.yellow,
	  chartColors.green,
	  chartColors.blue,
	  chartColors.purple,
	  chartColors.grey,
          chartColors.pink
	],
        borderWidth: 2,
        data: ageConfirmedData
      },
      {
        label: 'Deaths',
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
        display: false
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Cases by age'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  }
})

const dailyChart = new Chart($('#dailyChart'), {
  type: 'bar',
  data: {
    labels: date,
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: chartColors.orange,
        borderColor: chartColors.orange,
        borderWidth: 2,
        data: getDailyConfirmed(confirmed)
      },
      {
        label: 'Deaths',
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        borderWidth: 2,
        data: getDailyDeaths(deaths)
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
        stacked: true,
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
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Daily new cases'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  }
})

const wilayaChart = new Chart($('#wilayaChart'), {
  type: 'horizontalBar',
  data: {
    labels: getConfirmedPerWilayaName(provinces),
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: chartColors.orange,
        borderColor: chartColors.orange,
        borderWidth: 2,
        data: getConfirmedPerWilayaValue(provinces)
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
    title: {
      display: true,
      text: 'Cases per wilaya'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  }
})

function getDailyConfirmed(confirmed) {
  let dailyConfirmed = []
  for (var i = 0; i < confirmed.length; ++i) {
    dailyConfirmed.push(confirmed[i] - (confirmed[i-1] === undefined ? 0 : confirmed[i-1]))
  }
  return dailyConfirmed
}

function getDailyDeaths(deaths) {
  let dailyDeaths = []
  for (var i = 0; i < deaths.length; ++i) {
    dailyDeaths.push(deaths[i] - (deaths[i-1] === undefined ? 0 : deaths[i-1]))
  }
  return dailyDeaths
}

function getConfirmedPerWilayaName(provinces) {
  return getConfirmedPerWilaya(provinces).map((t, i) => (i+1)+' - '+ t[0])
}

function getConfirmedPerWilayaValue(provinces) {
  return getConfirmedPerWilaya(provinces).map(t => t[1])
}

function getConfirmedPerWilaya(provinces) {
  var items = Object.keys(provinces).map(key => [key, provinces[key].confirmed])
  items.sort((first, second) => second[1] - first[1])
  return items
}
