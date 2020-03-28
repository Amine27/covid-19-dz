const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264,302,367,409,454]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,10,12,12,12,12,12,12,22,23,23,24,24,29,29,31]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19,21,25,26,29]
const gender = ['Man', 'Woman']
const genderData = [195, 172]
const age = ['< 5', '5 - 14', '15 - 24', '25 - 34', '35 - 44', '45 - 59', '60 - 70', '+70']
const ageConfirmedData = [2, 9, 25, 55, 66, 87, 66, 56]
const ageDeathsData = [0, 0, 0, 0, 1, 10, 8, 6]

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  pink: 'rgb(255, 192, 203)'
}

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
    responsive: true,
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
        data: getDailyConfirmed()
      },
      {
        label: 'Deaths',
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        borderWidth: 2,
        data: getDailyDeaths()
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

function getDailyConfirmed() {
  let dailyConfirmed = []
  for (var i = 0; i < confirmed.length; ++i) {
    dailyConfirmed.push(confirmed[i] - (confirmed[i-1] === undefined ? 0 : confirmed[i-1]))
  }
  return dailyConfirmed
}

function getDailyDeaths() {
  let dailyDeaths = []
  for (var i = 0; i < deaths.length; ++i) {
    dailyDeaths.push(deaths[i] - (deaths[i-1] === undefined ? 0 : deaths[i-1]))
  }
  return dailyDeaths
}
