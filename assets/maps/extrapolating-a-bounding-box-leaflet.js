
var map = L.map('map').setView([56.592, -4.482], 7);

//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  maxZoom: 19,
//  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
//map.on('click', onMapClick);

// control that shows county info on hover
const info = L.control();
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
info.update = function (props) {
  const contents = props ? `<b>${props.name}</b><br />Postal: <b>${props.postal}</b>` : 'Hover over a county';
  this._div.innerHTML = `<h4>Scotland</h4>${contents}`;
};
info.addTo(map);

function style(feature) {
  return {
    weight: 1,
    color: '#bcbcbc',
    //dashArray: '3',
    fillOpacity: 1,
    fillColor: '#efefef'
  };
}

function style_bbox(feature) {
  return {
    weight: 1,
    color: '#444444',
    dashArray: '',
  };
}

function highlightFeature(e) {

  // first, draw bounding box of the feature
  //
  const bbox = e.target.getBounds();
  bbox_layer = L.rectangle(bbox);
  bbox_layer.setStyle({
    weight: 1,
    color: '#444444',
    dashArray: '',
  });
  bbox_layer.addTo(map);

  // second, extrapolate the edges of the bounding box
  //
  var ne_lat = bbox._northEast.lat;
  var ne_lng = bbox._northEast.lng;
  var sw_lat = bbox._southWest.lat;
  var sw_lng = bbox._southWest.lng;
  
  var bbox_extra_right = [
    [90, ne_lng],
    [-90, ne_lng]
  ];

  var bbox_extra_top = [
    [ne_lat, 180],
    [ne_lat, -180]
  ];

  var bbox_extra_left = [
    [90, sw_lng],
    [-90, sw_lng]
  ];

  var bbox_extra_bottom = [
    [sw_lat, 180],
    [sw_lat, -180]
  ];
  
  line_right  = L.polyline(bbox_extra_right,  {color: '#444444', weight: 1}).addTo(map);
  line_top    = L.polyline(bbox_extra_top,    {color: '#444444', weight: 1}).addTo(map);
  line_left   = L.polyline(bbox_extra_left,   {color: '#444444', weight: 1}).addTo(map);
  line_bottom = L.polyline(bbox_extra_bottom, {color: '#444444', weight: 1}).addTo(map);  

  // third, change the style of the feature under the mouse
  //
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#911c20',
    dashArray: '',
    fillOpacity: 1,
    fillColor: '#b7484b'
  });
  layer.bringToFront();
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
  map.removeLayer(bbox_layer);
  map.removeLayer(line_right);
  map.removeLayer(line_top);
  map.removeLayer(line_left);
  map.removeLayer(line_bottom);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

const geojson = L.geoJson(scotland, {
  style,
  onEachFeature
}).addTo(map);

