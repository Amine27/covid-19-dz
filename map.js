var map = L.map('map').setView([28.5, 1.8], 4.8);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pbmVyb3VraCIsImEiOiJjazgwanNndWIwMjVjM21tdzFqb2d0Z3g2In0.pl24-pEleZ_3DywYNIZ8vA', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

if (L.Browser.touch) {
  L.control.touchHover().addTo(map);
}

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<span class="confirmed">Confirmed: 264</span><br><span class="recovered">Recovered: 89</span><br><span class="deaths">Deaths: 19</span><br><br>'
    + (props ? '<b>' + props.NAME_1 + '</b><br />' + props.CASES + (props.CASES > 1 ? ' cases</sup>' : ' case</sup>') : 'Hover over a state');
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
  return d > 20 ? '#800026' :
    d > 15 ? '#BD0026' :
    d > 10 ? '#E31A1C' :
    d > 7 ? '#FC4E2A' :
    d > 5 ? '#FD8D3C' :
    d > 2 ? '#FEB24C' :
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
    fillColor: getColor(feature.properties.CASES)
  };
}

function highlightFeature(e) {
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
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    dblclick: zoomToFeature
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
      grades = [0, 2, 5, 7, 10, 15, 20],
      labels = [],
      from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
	from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
