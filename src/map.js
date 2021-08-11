import i18next from 'i18next'
import L from 'leaflet'
import ajax from 'leaflet-ajax'
import 'leaflet/dist/leaflet.css'
import {provinces} from './data.js'
let mapInstance
let info
let geojson
let previousTarget = null
let mapStyle = 'light-v10'
let mapStatesBorderColor = 'white'
const grades = [0, 100, 200, 300, 400, 500, 1000]
const gradesText = ['0', '100', '200', '300', '400', '500', '1k']

export const setMapStatesBorderColor = (val) => {
  mapStatesBorderColor = val
}

export const setMapStyle = (val) => {
  mapStyle = val
}

export const initMap = () => {
  if (mapInstance && mapInstance.remove) {
    mapInstance.off()
    mapInstance.remove()
  }

  mapInstance = L.map('map').setView([33, 3], 5.8)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pbmVyb3VraCIsImEiOiJjazgwanNndWIwMjVjM21tdzFqb2d0Z3g2In0.pl24-pEleZ_3DywYNIZ8vA', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
      '© <a href="https://www.mapbox.com/">Mapbox</a>',
    id: mapStyle,
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mapInstance)

  // control that shows state info on hover
  info = L.control()
  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update()
    return this._div
  }

  info.update = function (props) {
    this._div.innerHTML = props
      ? `<div class='province'>${i18next.t(`provinces.${props.NAME}`)}</div>`
      + '<div class="confirmed spacing">'+i18next.t("confirmed")+': ' + provinces[props.NAME].confirmed + (provinces[props.NAME].new_confirmed > 0 ? ' <sup>+'+provinces[props.NAME].new_confirmed+'</sup>' : '') + '</div>'
      : i18next.t("hover-city-map")+'<br>'
  }

  info.addTo(mapInstance)

  geojson = new L.geoJson.ajax('./map/algeria.json', {
    style: (feature) => {
      return {
        weight: 2,
        opacity: 1,
        color: mapStatesBorderColor,
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: getColor(provinces[feature.properties.NAME].confirmed)
      }
    },
    onEachFeature: (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        dblclick: zoomToFeature,
        click: highlightFeature
      })
    }
  }).addTo(mapInstance)

  mapInstance.attributionControl.addAttribution(`${i18next.t('data')}: <a href="http://covid19.sante.gov.dz/">MSP</a>`)

  const legend = L.control({
    position: 'bottomright'
  })
  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend')
    const labels = []

    for (let i = 0; i < grades.length; i++) {
      labels.push(`<span style="background:${getColor(grades[i] + 1)}"></span>`)
    }

    labels.push('<br>')

    for (let i = 0; i < gradesText.length; i++) {
      labels.push(`<label>${gradesText[i]}${gradesText[i + 1] ? `-${gradesText[i + 1]}` : '+'}</label>`)
    }

    div.innerHTML = labels.join('')
    return div
  }

  legend.addTo(mapInstance)
}

// get color depending on population density value
const getColor = (d) => {
  return d > grades[6] ? '#800026'
    : d > grades[5] ? '#BD0026'
    : d > grades[4] ? '#E31A1C'
    : d > grades[3] ? '#FC4E2A'
    : d > grades[2] ? '#FD8D3C'
    : d > grades[1] ? '#FEB24C'
    : d > grades[0] ? '#FED976'
    : '#fff8db'
}

const highlightFeature = (e) => {
  resetHighlight(previousTarget)
  previousTarget = e
  const layer = e.target

  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront()
  }

  info.update(layer.feature.properties)
}

const resetHighlight = (e) => {
  if (e !== null) {
    geojson.resetStyle(e.target)
    info.update()
  }
}

const zoomToFeature = (e) => {
  mapInstance.fitBounds(e.target.getBounds())
}
