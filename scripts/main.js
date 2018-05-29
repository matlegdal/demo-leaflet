const fujitsu = [46.830545, -71.306222];
const map = L.map('map').setView(fujitsu, 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; Fujitsu'
}).addTo(map);

L.marker(fujitsu).addTo(map)
    .bindPopup('Nos bureaux à Québec!')
    .openPopup();