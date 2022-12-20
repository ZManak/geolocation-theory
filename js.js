//Creamos los tiles del mapa
const mapMetros = L.map('mapMetros').setView([34.034570999698104, -118.28320316464496], 11);
const mapBuses = L.map('mapBuses').setView([34.034570999698104, -118.28320316464496], 11);

//Acceso a las APIS
const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
  'pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg';

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapMetros);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapBuses);

//marcador personalizado

//Personalización de markers
var metroMarker = L.icon({
  iconUrl: './assets/marker.png',
  iconSize: [10, 15], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -5] // point from which the popup should open relative to the iconAnchor
});

//Funciones asíncronas para petición de data
async function getMetros() {
  let resp = await fetch("https://api.metro.net/LACMTA_Rail/vehicle_positions/all?geojson=false");
  let metros = await resp.json();
  return metros;
}

async function getBuses() {
  let resp = await fetch("https://api.metro.net/LACMTA/vehicle_positions/all?geojson=false");
  let buses = await resp.json();
  return buses;
}

//let arrMetros = [];
let arrBuses = [];

getBuses()
  .then(buses => {
    for (bus of buses) {
      let marker = L.marker([bus.position.latitude, bus.position.longitude]).addTo(mapBuses);
      marker.bindPopup(`Vehicle ID: ${bus.vehicle.vehicle_id}`);
      arrBuses.push(marker);
    }
  }
  )

// let mapa = document.getElementById("mapMetros");
// function refresh() {
//   mapa.contentWindow.reload(true, 3000);
//  }
const arrMetros = [];
setInterval(function () {
  mapMetros.invalidateSize();
  //parent.document.getElementById("iFrame").reload();
  getMetros()
    .then(metros => {
      for (marker of arrMetros) {
        marker.remove();
      }
      for (metro of metros) {
        let marker = L.marker([metro.position.latitude, metro.position.longitude], { icon: metroMarker }).addTo(mapMetros);
        marker.bindPopup(`Vehicle ID: ${metro.vehicle.vehicle_id}`);
        arrMetros.push(marker);
      }
    }
  )
}, 3000);

/*
let circle = L.circle([40.55459415189354, -3.634574851421551], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
let polygon = L.polygon([
    [40.55237687246539, -3.630454978403035],
    [40.54585503669255, -3.6339740365013813],
    [40.54295261557035, -3.625991782766108],
    [40.54882255071863, -3.6201552961639725]
]).addTo(map);

circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");*/

L.tileLayer(MAPBOX_API, {
  attribution: ATTRIBUTION,
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: ACCESS_TOKEN
}).addTo(mapMetros);

L.tileLayer(MAPBOX_API, {
  attribution: ATTRIBUTION,
  maxZoom: 18,
  id: 'mapbox/navigation-night-v1',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: ACCESS_TOKEN
}).addTo(mapBuses);

/*let layer = L.marker([metro.position.latitude, metro.position.longitude], { icon: metroMarker }).addTo(mapMetros);
layer.addTo(map);
layer.remove();*/