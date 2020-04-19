var map = L.map('map').setView([33, 3], 5.8);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pbmVyb3VraCIsImEiOiJjazgwanNndWIwMjVjM21tdzFqb2d0Z3g2In0.pl24-pEleZ_3DywYNIZ8vA', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = (props ?
                         '<b>' + props.NAME_1 + ':</b><br><br>'
                         + '<div class="confirmed spacing">Confirmed: ' + props.CONFIRMED + (props.NEW_CONFIRMED > 0 ? ' <sup>+'+props.NEW_CONFIRMED+'</sup>' : '') + '</div>'
                         + '<div class="recovered spacing">Recovered: ' + props.RECOVERED + (props.NEW_RECOVERED > 0 ? ' <sup>+'+props.NEW_RECOVERED+'</sup>' : '') + '</div>'
                         + '<div class="deaths">Deaths: ' + props.DEATHS + (props.NEW_DEATHS > 0 ? ' <sup>+'+props.NEW_DEATHS+'</sup>' : '') + '</div><br>'
                         : 'Hover over a city<br>')
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
  return d > 100 ? '#800026' :
    d > 80 ? '#BD0026' :
    d > 60 ? '#E31A1C' :
    d > 40 ? '#FC4E2A' :
    d > 20 ? '#FD8D3C' :
    d > 10 ? '#FEB24C' :
    d > 0 ? '#FED976' :
    '#fff8db';
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.CONFIRMED)
  };
}

let previousTarget = null

function highlightFeature(e) {
  resetHighlight(previousTarget)
  previousTarget = e
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  if (e !== null) {
    geojson.resetStyle(e.target);
    info.update();
  }
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    dblclick: zoomToFeature,
    click: highlightFeature
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Data: <a href="http://covid19.sante.gov.dz/">MSP</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 40, 60, 80, 100],
      labels = []

  for (var i = 0; i < grades.length; i++) {
    labels.push('<span style="background:' + getColor(grades[i] + 1) + '"></span> ')
  }

  labels.push('<br>')

  for (var i = 0; i < grades.length; i++) {
    labels.push('<label>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+') + '</label> ')
  }

  div.innerHTML = labels.join('')
  return div
};

legend.addTo(map);
