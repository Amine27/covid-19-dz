const date = ['2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20']
const confirmed = [1,1,1,1,1,1,3,5,12,12,17,17,19,20,20,20,24,26,37,48,54,60,74,90,102,139,201,230,264]
const recovered = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,12,12,12,12,12,32,43,65,65,65,65]
const deaths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,4,4,6,9,11,15,17,17,19]
const gender = ['Man', 'Woman']
const genderData = [118, 112]
const age = ['< 25', '25 - 34', '35 - 44', '45 - 59', '+60']
const ageData = [16, 27, 45, 63, 72]

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
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
        backgroundColor: [
	  chartColors.red,
	  chartColors.orange,
	  chartColors.yellow,
	  chartColors.green,
	  chartColors.blue,
	  chartColors.purple,
	  chartColors.red
	],
        borderColor: [
	  chartColors.red,
	  chartColors.orange,
	  chartColors.yellow,
	  chartColors.green,
	  chartColors.blue,
	  chartColors.purple,
	  chartColors.red
	],
        borderWidth: 2,
        data: ageData
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
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    title: {
      display: true,
      text: 'Cases by age'
    }
  }
})
