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
import { Chart } from 'chart.js'

import resources from '../static/locales'
import {
  date, confirmed, recovered, deaths, critical, lastUpdated, provinces, vaccinatedPartly, vaccinatedFully, populationTotal
} from './data.js'
import {
  initCharts, initCumulChart, initDailyChart, initWilayaDailyChart, initWilayaEvolutionChart, wilayaChart
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
  grey: 'rgb(108, 117, 125)',
  pink: 'rgb(255, 192, 203)',
  gridLinesColor: 'rgba(0, 0, 0, 0.1)'
}

export const active = []
let provinceDailyDateList = []
let provinceDailyConfirmedList = []
let provinceAvg7ConfirmedList = []

const getTotalData = (dataType) => {
  if (dataType.length > 0) {
    return dataType[dataType.length - 1]
  }
  return 0
}

export const getDailyData = (dataType) => {
  const dailyData = []
  for (let i = 0; i < dataType.length; ++i) {
    dailyData.push(dataType[i] - (typeof dataType[i - 1] === 'undefined' ? 0 : dataType[i - 1]))
  }
  return dailyData
}

export const getAverageDailyData = (dataType, days) => {
  const dailyData = getDailyData(dataType).reverse()
  const averageDailyData = []

  for (let i = 0; i < dailyData.length; i++) {
    averageDailyData.push((dailyData.slice(i, i + days).reduce((a, b) => a + b, 0) / days).toFixed(2))
  }
  return averageDailyData.reverse()
}

const getNewData = (dataType) => {
  if (dataType.length > 1) {
    const newData = dataType[dataType.length - 1] - dataType[dataType.length - 2]
    if (newData > 0) {
      return `+${newData}`
    } else if (newData < 0) {
      return `${newData}`
    }
  }
  return 0
}

export const getDataPerWilayaName = (provinces, dataType, filter) => {
  return getDataPerWilaya(provinces, dataType, filter).map((t, i) => `${i + 1} - ` + i18next.t(`provinces.${t[0]}`))
}

export const getDataPerWilayaValue = (provinces, dataType, filter) => {
  return getDataPerWilaya(provinces, dataType, filter).map((t) => t[1])
}

const getDataPerWilaya = (provinces, dataType, filter) => {
  let items = Object.keys(provinces).map((key) => [key, provinces[key][dataType]])
  items.sort((first, second) => second[1] - first[1])
  if (filter) {
    items = items.filter((item) => item[1] > 0)
  }
  return items
}

// export const getActiveCases = () => {
//   const activeCases = []
//   for (let i = 0; i < confirmed.length; ++i) {
//     activeCases.push(confirmed[i] - (recovered[i] + deaths[i]))
//   }
//   return activeCases
// }

const calcActiveCases = () => {
  for (let i = 0; i < confirmed.length; ++i) {
    active.push(confirmed[i] - (recovered[i] + deaths[i]))
  }
}

const getTotalDays = (date) => date.length

const getDataRate = (confirmed, dataType) => getTotalData(dataType) / getTotalData(confirmed)

const getVaccinatedRate = (dataType) => getTotalData(dataType) / populationTotal

const getDataAugmentationRate = (dataType) => {
  let rate = ((getTotalData(dataType) - dataType[dataType.length - 2]) / getTotalData(dataType) * 100).toFixed(2)
  rate = rate > 0 ? `${rate}%` : '0%'
  return rate
}

export const getDataLocalized = (dataType) => dataType.map((e) => i18next.t(e))

const showData = () => {
  const lang = new Intl.Locale(i18next.language, { numberingSystem: "latn" })
  const nFormater = new Intl.NumberFormat(lang)
  const nFormaterCompact = new Intl.NumberFormat(lang, { notation: 'compact' })
  const nFormaterPercent = new Intl.NumberFormat(lang, { style: 'percent', minimumFractionDigits: 2 })

  $('#lastUpdated').attr('datetime', moment(lastUpdated).toISOString())
  $('#lastUpdated').attr('title', moment(lastUpdated).format('LLLL'))

  $('#totalConfirmed').text(nFormater.format(getTotalData(confirmed)))
  $('#totalRecovered').text(nFormater.format(getTotalData(recovered)))
  $('#totalDeaths').text(nFormater.format(getTotalData(deaths)))
  $('#vaccinatedFully').text(nFormaterCompact.format(getTotalData(vaccinatedFully)))
  $('#vaccinatedPartly').text(nFormaterCompact.format(getTotalData(vaccinatedPartly)))
  // $('#totalActive').text(nFormater.format(getTotalData(active)))

  $('#newConfirmed').text(nFormater.format(getNewData(confirmed)))
  $('#newRecovered').text(nFormater.format(getNewData(recovered)))
  $('#newDeaths').text(nFormater.format(getNewData(deaths)))
  // $('#newActive').text(getNewData(active))

  $('#totalDays').text(getTotalDays(date))
  $('#totalDaysText').text(i18next.t('totalDay_count', { count: getTotalDays(date) }))
  $('#fatalityRate').text(nFormaterPercent.format(getDataRate(confirmed, deaths)))
  $('#recoveryRate').text(nFormaterPercent.format(getDataRate(confirmed, recovered)))
  $('#critical').text(nFormater.format(critical))

  document.querySelector('#vaccinatedFully')._tippy.setContent(nFormater.format(getTotalData(vaccinatedFully)))
  document.querySelector('#vaccinatedFullyTooltip')._tippy.setContent(i18next.t('vaccinated-fully-tooltip', { count: nFormaterPercent.format(getVaccinatedRate(vaccinatedFully)) }))
  document.querySelector('#vaccinatedPartly')._tippy.setContent(nFormater.format(getTotalData(vaccinatedPartly)))
  document.querySelector('#vaccinatedPartlyTooltip')._tippy.setContent(i18next.t('vaccinated-partly-tooltip', { count: nFormaterPercent.format(getVaccinatedRate(vaccinatedPartly)) }))
}

const setupTable = (languageArray) => {
  $('#wilayaTable').DataTable().clear().destroy()

  const provincesData = []
  for (const key in provinces) {
    provincesData.push({
      province: i18next.t(`provinces.${key}`),
      confirmed: provinces[key].confirmed,
      newConfirmed: provinces[key].new_confirmed > 0 ? `+${provinces[key].new_confirmed}` : '',
      lastReported: {
        display: moment(provinces[key].last_reported).isValid() ? moment(provinces[key].last_reported).calendar(moment(), {
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
        days: moment().diff(moment(provinces[key].last_reported), 'days')
      },
      firstReported: moment(provinces[key].reported).isValid() ? moment(provinces[key].reported).format('ll') : ''
    })
  }

  $.fn.dataTable.moment('ll')
  const newCasesHeader = checkYesterday()

  $('#wilayaTable').DataTable({
    data: provincesData,
    order: [[1, 'desc']],
    paging: false,
    info: false,
    filter: false,
    // scrollX: true,
    // scrollY: 400,
    // scrollCollapse: true,
    columns: [
      // { className: "table_cells", targets: "_all" },
      {
        title: i18next.t('wilaya'),
        data: 'province',
        className: 'province',
        targets: 0
      },
      {
        title: i18next.t('confirmed'),
        data: 'confirmed',
        targets: 1
      },
      {
        title: newCasesHeader[0],
        data: 'newConfirmed',
        className: 'confirmed',
        targets: 2
      },
      {
        title: i18next.t('last-reported'),
        data: 'lastReported',
        render: (data, type, _) => {
          // If display or filter data is requested, return display
          if (type === 'display' || type === 'filter') {
            return data.display
          }
          // Otherwise the data type requested type or sort, return days
          return data.days
        },
        className: 'text-nowrap',
        targets: 3
      },
      {
        title: i18next.t('first-reported'),
        data: 'firstReported',
        className: 'text-nowrap',
        targets: 4
      }
    ],
    language: languageArray
  })
}

const setupTheme = () => {
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

const setupShare = () => {
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

const setupFB = () => {
  $.ajaxSetup({
    cache: true
  })
  let lang
  if (i18next.language === 'en') {
    lang = 'en_US'
  } else if (i18next.language === 'fr') {
    lang = 'fr_FR'
  } else if (i18next.language === 'ar') {
    lang = 'ar_AR'
  }
  const url = `https://connect.facebook.net/${lang}/sdk.js`
  $.getScript(url, () => {
    FB.init({
      appId: '271477604181906',
      version: 'v7.0',
      autoLogAppEvents: 'true',
      xfbml: 'true'
    })
  })
}

const setupWilayaSelect = () => {
  $('#wilayaList').empty()
  for (const key in provinces) {
    const province = [i18next.t(`provinces.${key}`)]
    const id = provinces[key].id
    $('#wilayaList').append($('<option></option>').attr('value', id).text(province))
  }
}

const i18nInit = () => {
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
  showData()
  setupWilayaSelect()
  setupFB()

  $('#totalDaysText').text(i18next.t('totalDay_count', { count: getTotalDays(date) }))

  if (provinceDailyDateList.length > 0) { // already initialized? translate it
    $('#wilayaList').change()
  }
  $('.preloader').fadeOut('slow')
})

const updateLayoutDirection = () => {
  const dir = i18next.dir()
  document.body.dir = dir
  if (dir === 'rtl') {
    $('html,#map').addClass('font-face-ar')
    $('#dropdownMenu').removeClass('dropdown-menu-right')
    Chart.defaults.font.family = "'Tajawal', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    Chart.defaults.plugins.legend.rtl = true
    Chart.defaults.plugins.tooltip.rtl = true
  } else {
    $('html,#map').removeClass('font-face-ar')
    $('#dropdownMenu').addClass('dropdown-menu-right')
    Chart.defaults.font.family = "'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    Chart.defaults.plugins.legend.rtl = false
    Chart.defaults.plugins.tooltip.rtl = false
  }
  Chart.defaults.plugins.legend.textDirection = dir
  Chart.defaults.plugins.tooltip.textDirection = dir
  $('tbody').attr('dir', dir)
}

const updateTooltipLang = () => {
  if (Array.isArray(tippyInstances)) {
    tippyInstances.forEach((instance) => instance.destroy())
  }
  // Set tooltip content to current language
  $('[data-tooltip-i18n]').each(function() {
    $(this).attr('data-tippy-content', i18next.t($(this).attr('data-tooltip-i18n')))
  })
  tippyInstances = tippy('[data-tippy-content]')
}

const updateTheme = (colorScheme) => {
  $('body').toggleClass('dark', colorScheme === 'dark')

  if (colorScheme === 'dark') {
    localStorage.setItem('theme', 'dark')
    $('#theme-switch').removeClass('icon-moon text-muted')
    $('#theme-switch').addClass('icon-sun text-warning')
    Chart.defaults.color = '#e6e6e6'
    chartColors.gridLinesColor = '#444'
    setMapStyle('dark-v10')
    setMapStatesBorderColor('#444')
    $('#fb-comments').attr('data-colorscheme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
    $('#theme-switch').removeClass('icon-sun text-warning')
    $('#theme-switch').addClass('icon-moon text-muted')
    Chart.defaults.color = '#666'
    chartColors.gridLinesColor = 'rgba(0, 0, 0, 0.1)'
    setMapStyle('light-v10')
    setMapStatesBorderColor('white')
    $('#fb-comments').attr('data-colorscheme', 'light')
  }
  initCharts()
  initMap()
}

const updateFromNow = () => {
  $('#lastUpdated').text(`${moment(lastUpdated).fromNow()}`)

  if (moment().diff(moment(lastUpdated), 'hours') < 1) {
    $('#blink').removeClass('d-none')
    $('#blink').addClass('d-inline-block')
  }
}

const checkYesterday = () => {
  const tableHeader = []
  if (moment(date[date.length - 1], 'M/D/YY').isBefore(moment(), 'day')) {
    $('#newConfirmedText, #newRecoveredText, #newDeathsText, #newActiveText').attr('data-i18n', 'yesterday')
    tableHeader.push(i18next.t('yesterday-confirmed'))
  } else {
    tableHeader.push(i18next.t('new-confirmed'))
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
  const dataRange = $('#dailyDataRange label.active input').val()
  initDailyChart(dataType, dataRange)
})

$('#wilayaList').change(() => {
  const provinceId = $('#wilayaList').val()
  localStorage.setItem('provinceId', provinceId)
  const confirmed = []
  provinceDailyDateList = []
  provinceDailyConfirmedList = []
  provinceAvg7ConfirmedList = []

  getProvinceData(provinceId).then((data) => {
    for (const d in data) {
      provinceDailyDateList.push(data[d].date)
      confirmed.push(data[d].confirmed)
      provinceDailyConfirmedList.push(data[d].newConfirmed)
      provinceAvg7ConfirmedList.push(data[d].avg7Confirmed)
    }
    initWilayaEvolutionChart(provinceDailyDateList, confirmed)
    initWilayaDailyChart(provinceDailyDateList, 'confirmed', provinceDailyConfirmedList, provinceAvg7ConfirmedList)
  })
})

$('#dailyDataRange input:radio').on('change', (e) => {
  const dataRange = e.target.value
  const dataType = $('#dailyChartsList').val()
  initDailyChart(dataType, dataRange)
})

$('#cumulDataRange input:radio').on('change', (e) => {
  const dataRange = e.target.value
  initCumulChart(dataRange)
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
  calcActiveCases()
  setupTheme()
  setInterval(updateFromNow, 60000) // 1 min
  setupShare()
})
