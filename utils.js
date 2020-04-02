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

$(document).ready(() => {
  $('#lastUpdated').text(`Last updated: ${lastUpdated}`)

  let provincesData = []
  for (key in provinces) {
    let province = [key,
                    provinces[key].confirmed,
                    provinces[key].new_confirmed > 0 ? '+'+provinces[key].new_confirmed : '',
                    provinces[key].deaths, provinces[key].new_deaths > 0 ? '+'+provinces[key].new_deaths : '',
                    provinces[key].recovered,
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
      { className: "province text-nowrap", targets: 0 },
      { className: "confirmed", targets: 2 },
      { className: "recovered text-nowrap", targets: 5 },
      { className: "deaths", targets: 4 },
      { className: "text-nowrap", targets: 6 }
    ]
  })
})

$('#tab a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  activeTab = e.target.id
  if(activeTab === 'table-tab') {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust()
  }
})
