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

function getTotalData(dataType) {
  if (dataType.length > 0)
    return dataType[dataType.length-1]
  return 0
}

function getDailyData(dataType) {
  let dailyData = []
  for (let i = 0; i < dataType.length; ++i) {
    dailyData.push(dataType[i] - (dataType[i-1] === undefined ? 0 : dataType[i-1]))
  }
  return dailyData
}

function getNewData(dataType) {
  if(dataType.length > 1) {
    let newData = dataType[dataType.length-1] - dataType[dataType.length-2]
    if (newData > 0)
      return `+${newData}`
  }
  return 0
}

function getDataPerWilayaName(provinces, dataType, filter) {
  return getDataPerWilaya(provinces, dataType, filter).map((t, i) => (i+1)+' - '+ t[0])
}

function getDataPerWilayaValue(provinces, dataType, filter) {
  return getDataPerWilaya(provinces, dataType, filter).map(t => t[1])
}

function getDataPerWilaya(provinces, dataType, filter) {
  let items = Object.keys(provinces).map(key => [key, provinces[key][dataType]])
  items.sort((first, second) => second[1] - first[1])
  if(filter)
    items = items.filter(item => item[1] > 0)
  return items
}

function getTotalDays(date) {
  return date.length
}

function getDataRate(confirmed, dataType) {
  return `${(getTotalData(dataType) / getTotalData(confirmed) * 100).toFixed(2)}%`
}

function getDataAugmentationRate(dataType) {
  return `${((getTotalData(dataType) - dataType[dataType.length-2]) / getTotalData(dataType) * 100).toFixed(2)}%`
}

function setupTable() {
  let provincesData = []
  for (key in provinces) {
    let province = [key,
                    provinces[key].confirmed,
                    provinces[key].new_confirmed > 0 ? '+'+provinces[key].new_confirmed : '',
                    provinces[key].deaths, provinces[key].new_deaths > 0 ? '+'+provinces[key].new_deaths : '',
                    moment(provinces[key].last_reported).isValid() ? moment(provinces[key].last_reported).calendar(moment(), {
                      sameDay:  '[Today]',
                      nextDay:  '[Tomorrow]',
                      nextWeek: 'dddd',
                      lastDay:  '[Yesterday]',
                      lastWeek: () => {
                        return "[" + moment().diff(moment(provinces[key].last_reported), 'days') + " days]"
                      },
                      sameElse: () => {
                        return "[" + moment().diff(moment(provinces[key].last_reported), 'days') + " days]"
                      }
                    }) : '',
                    moment(provinces[key].reported).isValid() ? moment(provinces[key].reported).format('ll') : '']
    provincesData.push(province)
  }

  $.fn.dataTable.moment('ll')

  $('#wilayaTable').DataTable({
    data: provincesData,
    order: [[ 1, 'desc' ]],
    paging: false,
    info: false,
    scrollX: true,
    scrollY: 400,
    scrollCollapse: true,
    columnDefs: [
      // { className: "table_cells", targets: "_all" },
      { className: "province", targets: 0 },
      { className: "confirmed", targets: 2 },
      { className: "deaths", targets: 4 },
      // { className: "text-nowrap", targets: 5 },
      { className: "text-nowrap", targets: 6 }
    ]
  })
}

function updateFromNow() {
  $('#lastUpdated').text(`Updated ${moment(lastUpdated).fromNow()}`)
}

function checkYesterday() {
  if (moment(date[date.length-1], 'M/D/YY').isBefore(moment(), 'day')) {
    $('#newConfirmedText, #newRecoveredText, #newDeathsText, #newTreatmentText').text('Yesterday')
    $('#newConfirmedTh, #newDeathsTh').text('Yesterday cases')
  }
}

$('#wilayaChartsList').change(() => {
  const chartData = $('#wilayaChartsList').val()
  let filter = false
  let dataset = wilayaChart.data.datasets[0]

  if (chartData === 'confirmed') {
    dataset.label = 'Confirmed'
    dataset.backgroundColor = chartColors.orange
    dataset.borderColor = chartColors.orange
  } else if (chartData === 'new_confirmed') {
    dataset.label = 'New confirmed'
    dataset.backgroundColor = chartColors.orange
    dataset.borderColor = chartColors.orange
    // filter = true
  } else if (chartData === 'deaths') {
    dataset.label = 'Deaths'
    dataset.backgroundColor = chartColors.red
    dataset.borderColor = chartColors.red
  } else if (chartData === 'new_deaths') {
    dataset.label = 'New deaths'
    dataset.backgroundColor = chartColors.red
    dataset.borderColor = chartColors.red
    // filter = true
  } else if (chartData === 'recovered') {
    dataset.label = 'Recovered'
    dataset.backgroundColor = chartColors.green
    dataset.borderColor = chartColors.green
  }
  dataset.data = getDataPerWilayaValue(provinces, chartData, filter)
  wilayaChart.data.labels = getDataPerWilayaName(provinces, chartData, filter)
  wilayaChart.update()
  wilayaChart.update()
})

$('#tab a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  activeTab = e.target.id
  if(activeTab === 'table-tab') {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust()
  }
})

$(document).ready(() => {
  moment.tz.setDefault('Europe/Brussels')
  checkYesterday()
  $('#lastUpdated').attr('datetime', moment(lastUpdated).toISOString())
  $('#lastUpdated').attr('title', moment(lastUpdated).format('LLLL'))

  $('#totalConfirmed').text(getTotalData(confirmed))
  $('#totalRecovered').text(getTotalData(recovered))
  $('#totalDeaths').text(getTotalData(deaths))
  $('#totalTreatment').text(getTotalData(treatment))

  $('#newConfirmed').text(getNewData(confirmed))
  $('#newRecovered').text(getNewData(recovered))
  $('#newDeaths').text(getNewData(deaths))
  $('#newTreatment').text(getNewData(treatment))

  $('#totalDays').text(getTotalDays(date))
  $('#fatalityRate').text(getDataRate(confirmed, deaths))
  $('#recoveryRate').text(getDataRate(confirmed, recovered))
  $('#augmentationRate').text(getDataAugmentationRate(treatment))

  $('[data-toggle="tooltip"]').tooltip()

  updateFromNow()
  setInterval(updateFromNow, 60000)
  setupTable()

  if(document.referrer === 'https://amine27.github.io/covid-19-dz/') {
    $('#alert').show()
  }
})
