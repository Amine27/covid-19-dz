let mapInstance
let info
let geojson
let previousTarget = null
let mapStyle = 'light-v10'
let mapStatesBorderColor = 'white'

function initMap() {

  if (mapInstance && mapInstance.remove) {
    mapInstance.off()
    mapInstance.remove()
  }

  mapInstance = L.map('map').setView([33, 3], 5.8);

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
    this._div.innerHTML = (props ?
                           '<div class="province">' + i18next.t('provinces.'+props.NAME_1) + '</div>'
                           + '<div class="confirmed spacing">'+i18next.t("confirmed")+': ' + props.CONFIRMED + (props.NEW_CONFIRMED > 0 ? ' <sup>+'+props.NEW_CONFIRMED+'</sup>' : '') + '</div>'
                           + '<div class="recovered spacing">'+i18next.t("recovered")+': ' + props.RECOVERED + (props.NEW_RECOVERED > 0 ? ' <sup>+'+props.NEW_RECOVERED+'</sup>' : '') + '</div>'
                           + '<div class="deaths">'+i18next.t("deaths")+': ' + props.DEATHS + (props.NEW_DEATHS > 0 ? ' <sup>+'+props.NEW_DEATHS+'</sup>' : '') + '</div>'
                           : i18next.t("hover-city-map")+'<br>')
  }

  info.addTo(mapInstance)

  geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(mapInstance)

  mapInstance.attributionControl.addAttribution(i18next.t('data')+': <a href="http://covid19.sante.gov.dz/">MSP</a>')

  let legend = L.control({position: 'bottomright'})
  legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 25, 50, 75, 100, 150, 200],
        labels = []

    for (let i = 0; i < grades.length; i++) {
      labels.push('<span style="background:' + getColor(grades[i] + 1) + '"></span> ')
    }

    labels.push('<br>')

    for (let i = 0; i < grades.length; i++) {
      labels.push('<label>' + grades[i] + (grades[i + 1] ? '-' + grades[i + 1] : '+') + '</label> ')
    }

    div.innerHTML = labels.join('')
    return div
  }

  legend.addTo(mapInstance)

}

// get color depending on population density value
function getColor(d) {
  return d > 200 ? '#800026' :
    d > 150 ? '#BD0026' :
    d > 100 ? '#E31A1C' :
    d > 75 ? '#FC4E2A' :
    d > 50 ? '#FD8D3C' :
    d > 25 ? '#FEB24C' :
    d > 0 ? '#FED976' :
    '#fff8db'
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: mapStatesBorderColor,
    dashArray: '',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.CONFIRMED)
  }
}

function highlightFeature(e) {
  resetHighlight(previousTarget)
  previousTarget = e
  let layer = e.target

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

function resetHighlight(e) {
  if (e !== null) {
    geojson.resetStyle(e.target)
    info.update()
  }
}

function zoomToFeature(e) {
  mapInstance.fitBounds(e.target.getBounds())
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    dblclick: zoomToFeature,
    click: highlightFeature
  })
}
