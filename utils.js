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
    let province = [key, provinces[key].confirmed, provinces[key].recovered, provinces[key].deaths, moment(provinces[key].reported).isValid() ? moment(provinces[key].reported).format('ll') : '']
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
      { className: "confirmed text-nowrap", targets: 1 },
      { className: "recovered text-nowrap", targets: 2 },
      { className: "deaths text-nowrap", targets: 3 },
      { className: "text-nowrap", targets: 4 }
    ]
  })
})
