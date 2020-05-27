import 'bootstrap-v4-rtl'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import moment from 'moment'
import 'moment-timezone'
import dt from 'datatables.net-bs4'
import 'datatables.net-plugins/sorting/datetime-moment.js'
import i18next from 'i18next'
import jqueryI18next from 'jquery-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import tippy from 'tippy.js'

import resources from '../static/locales'
import {
  date, confirmed, recovered, deaths, treatment, gender, genderData, age, ageConfirmedData, ageDeathsData, lastUpdated, provinces
} from './data.js'
import {
  dailyChart, initCharts, initWilayaDailyChart, initWilayaEvolutionChart, wilayaChart
} from './charts.js'
import {
  initMap, setMapStatesBorderColor, setMapStyle
} from './map.js'
import {
  getProvinceData
} from './api.js'

let tippyInstances = null
export const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  pink: 'rgb(255, 192, 203)',
  gridLinesColor: 'rgba(0, 0, 0, 0.1)'
}

let provinceDailyDateList = []
let provinceDailyConfirmedList = []
let provinceDailyDeathsList = []
let provinceAvg7ConfirmedList = []
let provinceAvg7DeathsList = []

function getTotalData(dataType) {
  if (dataType.length > 0) {
    return dataType[dataType.length - 1]
  }
  return 0
}

export function getDailyData(dataType) {
  const dailyData = []
  for (let i = 0; i < dataType.length; ++i) {
    dailyData.push(dataType[i] - (dataType[i - 1] === undefined ? 0 : dataType[i - 1]))
  }
  return dailyData
}

export function getAverageDailyData(dataType, days) {
  const dailyData = getDailyData(dataType).reverse()
  const averageDailyData = []

  for (let i = 0; i < dailyData.length; i++) {
    averageDailyData.push((dailyData.slice(i, i + days).reduce((a, b) => a + b, 0) / days).toFixed(2))
  }
  return averageDailyData.reverse()
}

function getNewData(dataType) {
  if (dataType.length > 1) {
    const newData = dataType[dataType.length - 1] - dataType[dataType.length - 2]
    if (newData > 0) {
      return `+${newData}`
    }
  }
  return 0
}

export function getDataPerWilayaName(provinces, dataType, filter) {
  return getDataPerWilaya(provinces, dataType, filter).map((t, i) => `${i + 1} - ` + i18next.t(`provinces.${t[0]}`))
}

export function getDataPerWilayaValue(provinces, dataType, filter) {
  return getDataPerWilaya(provinces, dataType, filter).map((t) => t[1])
}

function getDataPerWilaya(provinces, dataType, filter) {
  let items = Object.keys(provinces).map((key) => [key, provinces[key][dataType]])
  items.sort((first, second) => second[1] - first[1])
  if (filter) {
    items = items.filter((item) => item[1] > 0)
  }
  return items
}

function getTotalDays(date) {
  return date.length
}

function getDataRate(confirmed, dataType) {
  return `${(getTotalData(dataType) / getTotalData(confirmed) * 100).toFixed(2)}%`
}

function getDataAugmentationRate(dataType) {
  let rate = ((getTotalData(dataType) - dataType[dataType.length - 2]) / getTotalData(dataType) * 100).toFixed(2)
  rate = rate > 0 ? `${rate}%` : '0%'
  return rate
}

export function getDataLocalized(dataType) {
  return dataType.map((e) => i18next.t(e))
}

function showData() {
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
}

function setupTable(languageArray) {
  $('#wilayaTable').DataTable().clear().destroy()

  const provincesData = []
  for (const key in provinces) {
    const province = [i18next.t(`provinces.${key}`),
                      provinces[key].confirmed,
                      provinces[key].new_confirmed > 0 ? `+${provinces[key].new_confirmed}` : '',
                      provinces[key].deaths, provinces[key].new_deaths > 0 ? `+${provinces[key].new_deaths}` : '',
                      moment(provinces[key].last_reported).isValid() ? moment(provinces[key].last_reported).calendar(moment(), {
                        sameDay: `[${i18next.t('today')}]`,
                        nextDay: `[${i18next.t('tomorrow')}]`,
                        nextWeek: 'dddd',
                        lastDay:  `[${i18next.t('yesterday')}]`,
                        lastWeek: () => {
                          return '[' + i18next.t('day_count', { count: moment().diff(moment(provinces[key].last_reported), 'days')}) + ']'
                        },
                        sameElse: () => {
                          return '[' + i18next.t('day_count', { count: moment().diff(moment(provinces[key].last_reported), 'days')}) + ']'
                        }
                      }) : '',
                      moment(provinces[key].reported).isValid() ? moment(provinces[key].reported).format('ll') : '']
    provincesData.push(province)
  }

  $.fn.dataTable.moment('ll')
  const newCasesHeader = checkYesterday()

  $('#wilayaTable').DataTable({
    data: provincesData,
    order: [[1, 'desc']],
    paging: false,
    info: false,
    scrollX: true,
    scrollY: 400,
    scrollCollapse: true,
    columnDefs: [
      // { className: "table_cells", targets: "_all" },
      {
        title: i18next.t('wilaya'),
        className: 'province',
        targets: 0
      },
      {
        title: i18next.t('confirmed'),
        targets: 1
      },
      {
        title: newCasesHeader[0],
        className: 'confirmed',
        targets: 2
      },
      {
        title: i18next.t('deaths'),
        targets: 3
      },
      {
        title: newCasesHeader[1],
        className: 'deaths',
        targets: 4
      },
      {
        title: i18next.t('last-reported'),
        className: 'text-nowrap',
        targets: 5
      },
      {
        title: i18next.t('first-reported'),
        className: 'text-nowrap',
        targets: 6
      }
    ],
    language: languageArray
  })
}

function setupTheme() {
  const savedTheme = localStorage.getItem('theme')
  let mode = 'light'
  if (savedTheme === 'dark') {
    mode = 'dark'
  } else if (savedTheme === 'light') {
    mode = 'light'
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    mode = 'dark'
  }
  updateTheme(mode)

  $('#theme-switch').click(() => {
    let mode = 'light'
    if ($('#theme-switch').hasClass('icon-moon')) {
      mode = 'dark'
    }
    updateTheme(mode)
  })
}

function setupShare() {
  $('#shareBtn').click(() => {
    if (navigator.share) {
      navigator.share({
        title: $('meta[property="og:title"]').attr('content'),
        text: $('meta[property="og:description"]').attr('content'),
        url: $('meta[property="og:url"]').attr('content')
      }).then(() => {
        // console.log('Thanks for sharing!')
      }).catch(console.error)
    } else {
      // console.log('Error: Unsupported feature: navigator.share()')
    }
  })
}

function setupWilayaSelect() {
  $('#wilayaList').empty()
  for (const key in provinces) {
    const province = [i18next.t(`provinces.${key}`)]
    const id = provinces[key].id
    $('#wilayaList').append($('<option></option>').attr('value', id).text(province))
  }
}

function i18nInit() {
  i18next
    .use(LanguageDetector)
    .init({
      resources,
      // debug: true,
      load: 'languageOnly',
      fallbackLng: 'en'
    }, (err, t) => {
      jqueryI18next.init(i18next, $)
      $('body,html').localize()
      $('a[data-lang-picker]').click(function() {
        i18next.changeLanguage($(this).attr('data-lang-picker')).then((t) => {
          $('body,html').localize()
        })
      })
    })
}

i18next.on('languageChanged', (lng) => {
  lng = lng.split('-')[0] // get only the lang part without locale
  updateLayoutDirection()
  moment.locale(lng === 'ar' ? 'ar-dz' : lng)
  updateFromNow()
  setupTable(resources[lng].translation)
  initCharts()
  updateTooltipLang()
  setupWilayaSelect()

  if (provinceDailyDateList.length > 0) { // already initialized? translate it
    $('#wilayaList').change()
  }
  $('.preloader').fadeOut('slow')
})

function updateLayoutDirection() {
  const dir = i18next.dir()
  document.body.dir = dir
  if (dir === 'rtl') {
    $('html,#map').addClass('font-face-ar')
    $('#dropdownMenu').removeClass('dropdown-menu-right')
    Chart.defaults.global.defaultFontFamily = "'Tajawal', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    Chart.defaults.global.legend.rtl = true
    Chart.defaults.global.tooltips.rtl = true
  } else {
    $('html,#map').removeClass('font-face-ar')
    $('#dropdownMenu').addClass('dropdown-menu-right')
    Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    Chart.defaults.global.legend.rtl = false
    Chart.defaults.global.tooltips.rtl = false
  }
  Chart.defaults.global.legend.textDirection = dir
  Chart.defaults.global.tooltips.textDirection = dir
  $('tbody').attr('dir', dir)
}

function updateTooltipLang() {
  if (Array.isArray(tippyInstances)) {
    tippyInstances.forEach((instance) => instance.destroy())
  }
  // Set tooltip content to current language
  $('[data-tooltip-i18n]').each(function() {
    $(this).attr('data-tippy-content', i18next.t($(this).attr('data-tooltip-i18n')))
  })
  tippyInstances = tippy('[data-tippy-content]')
}

function updateTheme(colorScheme) {
  $('body').toggleClass('dark', colorScheme === 'dark')

  if (colorScheme === 'dark') {
    localStorage.setItem('theme', 'dark')
    $('#theme-switch').removeClass('icon-moon text-muted')
    $('#theme-switch').addClass('icon-sun text-warning')
    Chart.defaults.global.defaultFontColor = '#e6e6e6'
    chartColors.gridLinesColor = '#444'
    setMapStyle('dark-v10')
    setMapStatesBorderColor('#444')
  } else {
    localStorage.setItem('theme', 'light')
    $('#theme-switch').removeClass('icon-sun text-warning')
    $('#theme-switch').addClass('icon-moon text-muted')
    Chart.defaults.global.defaultFontColor = '#666'
    chartColors.gridLinesColor = 'rgba(0, 0, 0, 0.1)'
    setMapStyle('light-v10')
    setMapStatesBorderColor('white')
  }
  initCharts()
  initMap()
}

function updateFromNow() {
  $('#lastUpdated').text(`${moment(lastUpdated).fromNow()}`)

  if (moment().diff(moment(lastUpdated), 'hours') < 1) {
    $('#blink').removeClass('d-none')
    $('#blink').addClass('d-inline-block')
  }

  // auto-reload page if new update is available (only between 15-19h)
  // if(moment().hours() < 20 && moment().hours() > 14) {
  //   fetch("https://corona-dz.live/js/data.js").then((data) => {
  //     data.text().then((text) => {
  //       text.split("\n").some((line) => {
  //         if(line.startsWith('const lastUpdated')) {
  //           const newUpdate = line.substring(line.indexOf("'")+1, line.lastIndexOf("'"))
  //           if(moment(lastUpdated) < moment(newUpdate)) {
  //             // reload current page without using cache
  //             document.location.reload(true)
  //           }
  //           return true
  //         }
  //       })
  //     })
  //   })
  // }
}

function checkYesterday() {
  const tableHeader = []
  if (moment(date[date.length - 1], 'M/D/YY').isBefore(moment(), 'day')) {
    $('#newConfirmedText, #newRecoveredText, #newDeathsText, #newTreatmentText').attr('data-i18n', 'yesterday')
    tableHeader.push(i18next.t('yesterday-confirmed'))
    tableHeader.push(i18next.t('yesterday-deaths'))
  } else {
    tableHeader.push(i18next.t('new-confirmed'))
    tableHeader.push(i18next.t('new-deaths'))
  }
  return tableHeader
}

$('#wilayaChartsList').change(() => {
  const chartData = $('#wilayaChartsList').val()
  const filter = false
  const dataset = wilayaChart.data.datasets[0]

  if (chartData === 'confirmed') {
    dataset.label = i18next.t('confirmed')
    dataset.backgroundColor = chartColors.orange
    dataset.borderColor = chartColors.orange
  } else if (chartData === 'new_confirmed') {
    dataset.label = i18next.t('new-confirmed')
    dataset.backgroundColor = chartColors.orange
    dataset.borderColor = chartColors.orange
    // filter = true
  } else if (chartData === 'deaths') {
    dataset.label = i18next.t('deaths')
    dataset.backgroundColor = chartColors.red
    dataset.borderColor = chartColors.red
  } else if (chartData === 'new_deaths') {
    dataset.label = i18next.t('new-deaths')
    dataset.backgroundColor = chartColors.red
    dataset.borderColor = chartColors.red
    // filter = true
  } else if (chartData === 'recovered') {
    dataset.label = i18next.t('recovered')
    dataset.backgroundColor = chartColors.green
    dataset.borderColor = chartColors.green
  }
  dataset.data = getDataPerWilayaValue(provinces, chartData, filter)
  wilayaChart.data.labels = getDataPerWilayaName(provinces, chartData, filter)
  wilayaChart.update()
  wilayaChart.update() // Twice to take effect!
})

$('#dailyChartsList').change(() => {
  const dataType = $('#dailyChartsList').val()
  const lineDataset = dailyChart.data.datasets[1]
  const barDataset = dailyChart.data.datasets[0]
  const days = 7

  if (dataType === 'confirmed') {
    lineDataset.label = i18next.t('confirmed')
    lineDataset.backgroundColor = chartColors.orange
    lineDataset.borderColor = chartColors.orange
    barDataset.data = getAverageDailyData(confirmed, days)
    lineDataset.data = getDailyData(confirmed)
  } else if (dataType === 'deaths') {
    lineDataset.label = i18next.t(dataType)
    lineDataset.backgroundColor = chartColors.red
    lineDataset.borderColor = chartColors.red
    barDataset.data = getAverageDailyData(deaths, days)
    lineDataset.data = getDailyData(deaths)
  } else if (dataType === 'recovered') {
    lineDataset.label = i18next.t(dataType)
    lineDataset.backgroundColor = chartColors.green
    lineDataset.borderColor = chartColors.green
    barDataset.data = getAverageDailyData(recovered, days)
    lineDataset.data = getDailyData(recovered)
  } else if (dataType === 'treatment') {
    lineDataset.label = i18next.t(dataType)
    lineDataset.backgroundColor = chartColors.blue
    lineDataset.borderColor = chartColors.blue
    barDataset.data = getAverageDailyData(treatment, days)
    lineDataset.data = getDailyData(treatment)
  }
  dailyChart.update()
  dailyChart.update() // Twice to take effect!
})

$('#wilayaList').change(() => {
  const provinceId = $('#wilayaList').val()
  localStorage.setItem('provinceId', provinceId)
  const confirmed = []
  const deaths = []
  provinceDailyDateList = []
  provinceDailyConfirmedList = []
  provinceDailyDeathsList = []
  provinceAvg7ConfirmedList = []
  provinceAvg7DeathsList = []

  getProvinceData(provinceId).then((data) => {
    for (const d in data) {
      provinceDailyDateList.push(data[d].date)
      confirmed.push(data[d].confirmed)
      deaths.push(data[d].deaths)
      provinceDailyConfirmedList.push(data[d].newConfirmed)
      provinceDailyDeathsList.push(data[d].newDeaths)
      provinceAvg7ConfirmedList.push(data[d].avg7Confirmed)
      provinceAvg7DeathsList.push(data[d].avg7Deaths)
    }
    initWilayaEvolutionChart(provinceDailyDateList, confirmed, deaths)
    $('#wilayaDailyList').val($('#wilayaDailyList').val()).change()
  })
})

$('#wilayaDailyList').change(() => {
  const dataType = $('#wilayaDailyList').val()

  if (dataType === 'confirmed') {
    initWilayaDailyChart(provinceDailyDateList, dataType, provinceDailyConfirmedList, provinceAvg7ConfirmedList)
  } else if (dataType === 'deaths') {
    initWilayaDailyChart(provinceDailyDateList, dataType, provinceDailyDeathsList, provinceAvg7DeathsList)
  }
})

$('#tab a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  const activeTab = e.target.id
  if (activeTab === 'table-tab') {
    $.fn.dataTable.tables({
      visible: true,
      api: true
    }).columns.adjust()
  } else if (activeTab === 'evolution-tab') {
    if (provinceDailyDateList.length === 0) { // not initialized? initilize it
      const savedWilaya = localStorage.getItem('provinceId')
      if (savedWilaya) {
        $('#wilayaList').val(savedWilaya).change()
      } else {
        $('#wilayaList').change()
      }
    }
  }
})

$(document).ready(() => {
  i18nInit()
  moment.tz.setDefault('Europe/Brussels')
  showData()
  setupTheme()
  setInterval(updateFromNow, 60000) // 1 min
  setupShare()

  if (document.referrer === 'https://amine27.github.io/covid-19-dz/') {
    $('#alert').show()
  }
})
